import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { getUserChats } from '../../actions/chatActions';
import { useSelector, useDispatch } from "react-redux"; 
import UseAllUserChats from '../../utils/hooks/useAllUserChats';

const Messages = ({ socket, chatMessages, participatedUser, user }) => {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const dispatch = useDispatch();
  moment.locale('fi')

  const { 
    addToUnredCounter,
   } = UseAllUserChats();
  
  useEffect(() => {
    setMessages(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    const messageListener = (message) => {
        if (message?.length > 0) {
            setMessages(message)
            console.log('CHATTI MUUTTUU JAT TULEE VIESTI')
            // Tässä kohtaa voisi päivittää chattien tilaa
          //dispatch(getUserChats())
            addToUnredCounter(1);
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

  const checkUserName = (userId) => {
    if (userId === participatedUser?._id) {
      return participatedUser.name;
    }
    return user?.name;
  };

  const scrollBottomOfChat = () => {
    const scroll = messageRef.current.scrollHeight - messageRef.current.clientHeight;
    messageRef.current.scrollTo(0, scroll);
  };

  useEffect(() => {
    scrollBottomOfChat()
   }, [messages]);

  return (
    <MessageList ref={messageRef}>
      {messages
        ?.sort((a, b) => a.time - b.time)
        ?.map(({ createdAt, message, createdBy }) => (
          <MessageContainer
            className="my-3 mr-4"
            isCurrentUser={user?._id === createdBy}
            key={createdAt}
          >
            {/*<User>{checkUserName(createdBy)}</User>*/}
            <Message>{message}</Message>
            <DateMark isCurrentUser={user?._id === createdBy}  className="text-right">{moment(createdAt).format('LL')}</DateMark>
          </MessageContainer>
        ))
      }
    </MessageList>
  );
}

const MessageList = styled.div`
  max-height: calc(100vh - calc(100vh / 2));
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: lex-start;
  align-items: flex-end;

`;

const MessageContainer = styled.div`
  background-color: ${props => props.isCurrentUser ? '#1f223d' : '#e8e8e8'};
  color: ${props => props.isCurrentUser ? '#fff' : '#1c1c1c'};
  padding: 15px;
  align-self: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
  border-radius: 10px 10px 0 10px;
  border-radius: ${props => props.isCurrentUser ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  max-width: 50%;
  min-width: 150px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  transform: scale(0);
  transform-origin: right;
  animation-name: showIn;
  animation-duration: 0.2s; /* or: Xms */
  animation-iteration-count: 1;
  animation-direction: normal; /* or: normal */
  animation-timing-function: cubic-bezier(
    0.88,
    0.19,
    0.37,
    1.11
  ); /* or: ease, ease-in, ease-in-out, linear, cubic-bezier(x1, y1, x2, y2) */
  animation-fill-mode: both; /* or: backwards, both, none */
  animation-delay: 0.2s; /* or: Xms */
}
@keyframes showIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

`;
  
const DateMark = styled.div`
    font-size: 0.625rem;
    color: #fff;
    color: ${props => props.isCurrentUser ? '#fff' : '#1c1c1c'};
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
