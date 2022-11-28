import { useEffect, useState, createContext, useContext } from "react";
import { message } from 'antd'

// To save previous content even after the app is closed
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
});

const client = new WebSocket('ws://localhost:4000')
client.onopen = () => console.log('Backend socket server connected!');

const ChatProvider = (props) => {

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState({}); // {}

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [type, payload] = JSON.parse(data);

        switch (type) {
            case 'CHAT': {
                const {to, body} = payload;
                console.log("<frontend> at CHAT: ", payload);
                let newMessages = {...messages};
                if (body.length > 0)
                    newMessages[to] = body;
                else
                    newMessages[to] = [];
                console.log("<frontend> at CHAT after: ", newMessages)
                setMessages(newMessages);
                break;
            }
            case 'MESSAGE': {
                const {from, to, body} = payload;
                console.log('<frontend> at MESSAGE: ', payload);
                let newMessages = {...messages};
                const name = (me === to) ? from : to;
                if (body.length > 0)
                    newMessages[name] = body;
                else
                    newMessages[name] = [];
                console.log("<frontend> at MESSAGE: ", newMessages)
                setMessages(newMessages);
                break;
            }
            case 'status': {
                setStatus(payload);
                break;
            }
            default: break;
        }
    }

    const startChat = (name, to) => {
        console.log("<startChat>", name, to)
        if( !name || !to ) throw new Error('Name or to required.');

        sendData({
            type: 'CHAT',
            payload: { name, to },
        });
    };

    const sendMessage = (name, to, body) => {
        console.log(name, to, body)
        if ( !name || !to || !body ) throw new Error('name or to or body required.');

        sendData({
            type: 'MESSAGE',
            payload: {name, to, body},
        });
    };

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
 
    const clearMessages = () => {
        sendData(["CLEAR"]);
    };

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5 }
            switch (type) {
                case 'success' :
                    message.success(content)
                    break
                case 'error' :
                    default:
                    message.error(content)
                    break
            }
        }
    }

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);


    return (
        <ChatContext.Provider
            value={{
                status, 
                me, 
                signedIn, 
                messages, 
                setMe, 
                setSignedIn, 
                startChat,
                sendMessage, 
                clearMessages, 
                displayStatus
            }}
            {...props}
        />
    )

}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };