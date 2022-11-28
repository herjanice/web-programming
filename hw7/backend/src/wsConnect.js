// import { UserModel, MessageModel, ChatBoxModel } from './models/chatbox.js'
import Message from './models/message.js'

import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema ({
    name: {type: String, required: [true, 'Name field is required.'] },
    chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const UserModel = mongoose.model('User', UserSchema);

const MessageSchema = new Schema({
    chatBox: { type: mongoose.Types.ObjectId, ref:'Chatbox'},
    sender: { type: mongoose.Types.ObjectId, ref:'User'},
    body: { type: String, required: [true, 'Body field is required'] },
});

const MessageModel = mongoose.model('Message', MessageSchema);

const ChatBoxSchema = new Schema({
    name: { type: String, required: [true, 'Name field is required.'] },
    users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref:'Message' }],
});

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

const makeName = (name, to) => { return [name, to].sort().join('_'); };

const validateUser = async(name) => {
    const existing = await UserModel.findOne({ name });
    if(existing)
        return existing;
    else
        return await new UserModel({ name }).save();
}

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) {
        box = await new ChatBoxModel({ name, users: participants }).save();
        for (var i=0; i < participants.length; i++)
        {
            await UserModel.updateOne({_id: participants[i]._id}, {$push: {chatBoxes: box._id}})
        }
    }

    return box.populate(["users", { path: 'messages', populate: 'sender' }])
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(['status', payload], ws);
}

const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
}

const chatBoxes = {};

export default {
    initData: (ws) => {
        Message.find()
            .sort({ created_at: -1 })
            .limit(100)
            .exec((err, res) => {
                if (err) throw err;

                //Initialize app with existing messages
                sendData(["init", res], ws);
            });
    },
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            console.log(data)
            const {type, payload} = JSON.parse(data)

            switch(type) {
                case 'CHAT': {
                    const { name, to } = payload;

                    if (ws.box !== "" && chatBoxes[ws.box])
                        // user(ws) was in another chatbox
                        chatBoxes[ws.box].delete(ws);

                    const chatBoxName = makeName(name, to)
                    ws.box = chatBoxName

                    if (!chatBoxes[ws.box])
                    chatBoxes[ws.box] = new Set();
    
                    chatBoxes[ws.box].add(ws)
                    // console.log("chatBoxes like this: ", chatBoxes)
                    console.log("wss kyk gini: ", wss)

                    const user1 = await validateUser(name);
                    const user2 = await validateUser(to);
                    const chatBox = await(validateChatBox(chatBoxName, [user1, user2]));

                    const messages = new Array(chatBox.messages.length)
                    for (var i=0; i < messages.length; i++) {
                        const {sender, body} = chatBox.messages[i]
                        const { name } = sender
                        messages[i] = { sender: name, body: body }
                    }

                    const output = {to: to, body: messages};
                    console.log("<backend> at CHAT: ", messages)

                    sendData(['CHAT', output], ws)
                    sendStatus({
                        type: 'success',
                        msg: 'Chatbox created.'
                    }, ws)
                    break
                    
                }
                case 'MESSAGE': {
                    const { name, to, body } = payload;

                    const chatBoxName = makeName( name, to )

                    const user1 = await validateUser(name);
                    const user2 = await validateUser(to);
                    const chatBox = await validateChatBox(chatBoxName, [user1, user2]);
                    
                    const message = new MessageModel({ chatBox: chatBox, sender: user1, body: body });
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error('Message DB save error: ' + e);
                    }

                    console.log("new message: ", message)

                    chatBox.messages.push(message);
                    await chatBox.save();

                    const messages = new Array(chatBox.messages.length)
                    for (var i=0; i < messages.length; i++) {
                        const {sender, body} = chatBox.messages[i]
                        const { name } = sender
                        messages[i] = { sender: name, body: body }
                    }

                    console.log("<backend> at MESSAGE: ", messages)

                    const output = {from: name, to: to, body: messages};

                    chatBoxes[chatBoxName].forEach((client) => {
                        sendData(['MESSAGE', output], client)
                    })
                    sendStatus({
                        type: 'success',
                        msg: 'Message sent.'
                    }, ws)
                    break;
                }

                default: break
            }
        }
    )
}