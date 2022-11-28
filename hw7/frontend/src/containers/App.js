import '../App.css'
import { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Button, Input, message, Tag } from 'antd'
import { useChat } from './hooks/useChat.js'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { me, status, signedIn, displayStatus } = useChat()

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    <Wrapper> {signedIn? <ChatRoom /> : <SignIn me={me} />} </Wrapper>
  )
}

export default App
