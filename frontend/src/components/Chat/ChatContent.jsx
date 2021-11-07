import React from 'react'
import styled from 'styled-components'
import MessageInput from './MessageInput'
import Messages from './Messages'
import Loader from "../Loader";
import useAllUserChats from '../../utils/hooks/useAllUserChats';

const ChatContent = ({ chatMessages, user, participatedUser, loading, chatId }) => {
  const { socket } = useAllUserChats();
  if (loading) return <Loader />; 
    return (
        <div style={{ minHeight: '600px',display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="px-2 py-3 mh-100">
          <div className="blocks">
            <div className="current-chatting-user">
              <h5>{participatedUser?.name}</h5>
            </div>
          </div>
        { socket ? (
        <ChatContainer>
          <Messages user={user} participatedUser={participatedUser} chatMessages={chatMessages} socket={socket} />
          <MessageInput chatId={chatId} participatedUser={participatedUser?._id} userId={user?._id} socket={socket} />
        </ChatContainer>
      ) : (
        <div>Not Connected</div>
      )}
      </div>
    )
}

const ChatContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 16px;
`;

export default ChatContent
