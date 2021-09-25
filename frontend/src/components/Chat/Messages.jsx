import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  moment.locale('fi')

  useEffect(() => {
    const messageListener = (message) => {
        if (message.value.length > 0) {
            setMessages((prevMessages) => [...prevMessages, message])
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
  console.log(messages)

  return (
    <MessageList>
      {messages
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <MessageContainer
            key={message.createdAt}
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            <User>{message.user.name}:</User>
            <Message>{message.value}</Message>
            <DateMark>{moment.unix(message.createdAt / 1000).format('LLL')}</DateMark>
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