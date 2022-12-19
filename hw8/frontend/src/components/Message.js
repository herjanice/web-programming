import styled, { css } from 'styled-components'
import { Tag } from 'antd'

// const StyledMessage = styled.div`
//     width: 100%;
//     height: 300px;
//     background: #eeeeee52;
//     border-radius: 10px;
//     margin: 20px;
//     padding: 20px;
//     overflow: auto;
// `;

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};
    margin: 8px 0px;

    & p:first-child {
        margin: 0 5px;
    }

    & p:last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`;


const Message = ({ isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <p> {message} </p>
        </StyledMessage>
    )
}

export default Message