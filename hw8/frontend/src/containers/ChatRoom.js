import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Tabs, Input } from 'antd'
import { useChat } from './hooks/useChat.js'
import Title from '../components/Title.js'
import Message from '../components/Message.js'
import ChatModal from '../components/ChatModal.js'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const FootRef = styled.div `
    height: 20px;
`;

function ChatRoom() {
    const { me, messages, activeKey, setActiveKey, startChat, sendMessage, displayStatus } = useChat()
    const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
    const [msg, setMsg] = useState('');
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgFooter = useRef(null)

    const displayChat = (chat) => {
        console.log("<displayChat>", chat)
        return ( 
            chat.length === 0 ? (
                <p style={{ color: '#ccc' }}> No messages... </p>
            ) : (
                <ChatBoxWrapper> {
                    chat.map(({ sender, body }, i) => (
                        <Message isMe={sender === me} message={body} key={i} />
                    ))} 
                    <FootRef ref={msgFooter}/>
                </ChatBoxWrapper>
            )
        )
    }

    const createChatBox = (friend) => {
        console.log("<createChatBox> friend: ", friend)
        if(chatBoxes.some(({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
        }
        const chat = "";
        setChatBoxes([...chatBoxes, { label: friend, children: chat, key: friend }]);
        console.log("<createChatBoxes>: ", chatBoxes)
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        setChatBoxes(newChatBoxes);

        return activeKey ? 
            activeKey === targetKey ? 
                index === 0 ? 
                '' : chatBoxes[index-1].key
            : activeKey
        : '';
    }

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    useEffect(() => {
        console.log("new activeKey: ", activeKey)
        if(activeKey && messages[activeKey]) {
            console.log(activeKey, " has a new message")
            console.log("this is the message: ", messages[activeKey])
            const chat = displayChat(messages[activeKey])
            console.log("<displayChat>", chat)
            setChatBoxes( 
                chatBoxes.map((box) => 
                    box.label === activeKey ? {...box, children: chat} : box
                )
            )
            setMsgSent(true)
        }
    }, [messages[activeKey], activeKey])


    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent])

    return ( <>
        <Title name={me} />
        <>
            <ChatBoxesWrapper
                tabBarStyle={{ height: '36px' }}
                type='editable-card'
                activeKey={activeKey} // current active tabs
                onChange={(key) => {
                    setActiveKey(key);
                    startChat(me, key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}
            />
            <ChatModal
                open={modalOpen}
                onCreate={({ name }) => {
                    setActiveKey(createChatBox(name));
                    startChat(me, name);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
            />
        </>
        <Input.Search
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
                if(!msg) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter message.'
                    })
                    return
                } else if (activeKey === '') {
                    displayStatus({
                        type: 'error',
                        msg: 'Please add a chatbox first.',
                    });
                    setMsg('');
                    return;
                }
                sendMessage(me, activeKey, msg)
                setMsg('')
                setMsgSent(true)
            }}
        ></Input.Search>
        </>
    )
}

export default ChatRoom
