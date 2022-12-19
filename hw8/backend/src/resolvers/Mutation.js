const makeName = (name, to) => { return [name, to].sort().join('_'); };

const Mutation = {
    createChatBox: async (parent, {name1, name2}, {ChatBoxModel}) => {
        console.log("BACKEND: IN CREATE CHATBOX", name1, name2)
        const chatBoxName = makeName(name1, name2);
        let box =  await ChatBoxModel.findOne({ name: chatBoxName })
        if (!box) {
            console.log("BACKEND: CREATING NEW CHATBOX", chatBoxName)
            box = await new ChatBoxModel({ name: chatBoxName }).save();
        }

        return box;
    },
    createMessage: async (parent, {name, to, body}, {ChatBoxModel, pubsub}) => {
        console.log("BACKEND: IN CREATE MESSAGE: ", name, to, body)
        const chatBoxName = makeName( name, to );
        const chatBox = await ChatBoxModel.findOne({ name: chatBoxName });
        console.log("<createMessage>'s chatBox: ", chatBox)
        const newMsg = { sender: name, body };
        chatBox.messages.push(newMsg);
        await chatBox.save();

        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: newMsg,
        });

        return newMsg;
    },
};

export default Mutation;