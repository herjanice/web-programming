import { useEffect, useState, createContext, useContext } from "react";
import { message } from 'antd'
import { useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, MESSAGE_SUBSCRIPTION, CREATE_MESSAGE_MUTATION } from "../../graphql"

// To save previous content even after the app is closed
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    activeKey: "",
    signedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
});

const ChatProvider = (props) => {

    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [activeKey, setActiveKey] = useState('');
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState({}); 

    const { data, loading, error, subscribeToMore } = useQuery(CHATBOX_QUERY, {
        variables: {
            name1: me,
            name2: activeKey,
        },
    });

    useEffect(() => {
        if (activeKey && data) {
            let newMessages = {...messages};
            if (data.chatbox.messages.length > 0)
                newMessages[activeKey] = data.chatbox.messages;
            else
                newMessages[activeKey] = [];
            setMessages(newMessages);
        }
    }, [data])

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { from: me, to: activeKey },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    console.log("<subscriptionData> data: ", subscriptionData)
                    console.log("<subscriptionData> prev: ", prev)
                    console.log("<subscriptionData> new message: ", newMessage)
                    return {
                        chatbox: {
                            __typename: prev.chatbox.__typename,
                            name: prev.chatbox.name,
                            messages: [...prev.chatbox.messages, newMessage],
                        },
                    };
                }, 
            });
        } catch (e) {
            console.log("Error! ", e)
        }
    }, [subscribeToMore, activeKey]);

    const [startChatQL] = useMutation(CREATE_CHATBOX_MUTATION)
    const startChat = async (name, to) => {
        console.log("<startChat>", name, to)
        if( !name || !to ) throw new Error('Name or to required.');

        const chat = await startChatQL({
            variables: {
                name1: name,
                name2: to,
            },
        });

        console.log("<startChat> chat: ", chat)
    };

    const [sendMessageQL] = useMutation(CREATE_MESSAGE_MUTATION)
    const sendMessage = async (name, to, body) => {
        console.log(name, to, body)
        if ( !name || !to || !body ) throw new Error('name or to or body required.');

        const message = await sendMessageQL({
            variables: {
                name: name,
                to: to,
                body: body,
            },
        });

        console.log("<sendMessage> message: ", to, message)
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
                activeKey,
                signedIn, 
                messages, 
                setMe, 
                setActiveKey,
                setSignedIn, 
                startChat,
                sendMessage, 
                // clearMessages, 
                displayStatus
            }}
            {...props}
        />
    )

}

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };