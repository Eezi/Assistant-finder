import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Messages = ({ socket, chatMessages }) => {
  const [messages, setMessages] = useState([]);
  moment.locale('fi')

  useEffect(() => {
      if (chatMessages?.length > 0) {
        setMessages(chatMessages);
      }
  }, [chatMessages]);

  useEffect(() => {
    const messageListener = (message) => {
        if (message?.length > 0) {
            setMessages(message)
        }
    };
  
    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = {...prevMessages};
        delete newMessages[messageID];
        return newMessages;
      });
    };
  
    socket.on('message', messageListener);
    socket.on('deleteMessage', deleteMessageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
      socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  return (
    <MessageList>
      {messages
        .sort((a, b) => a.time - b.time)
        .map(({ createdAt, message }) => (
          <MessageContainer
            key={createdAt}
            title={`Sent at ${new Date(createdAt).toLocaleTimeString()}`}
          >
            <User>Tomi:</User>
            <Message>{message}</Message>
            <DateMark>{moment(createdAt).format('LLL')}</DateMark>
          </MessageContainer>
        ))
      }
    </MessageList>
  );
}

const MessageList = styled.div`
    max-width: 500px;
    width: 100%;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    border-bottom: 1px solid #eeeeee;
`;
  
const DateMark = styled.span`
    font-size: 0.625rem;
    color: #888888;
`;
  
const User = styled.span`
    min-width: 120px;
    font-size: 0.625rem;
    color: #888888;
`;
  
const Message = styled.span`
    flex-grow: 1;
    overflow-wrap: break-word;
`;

export default Messages;