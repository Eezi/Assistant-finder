import React, { useState, FC, ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { ChatTypes } from '../../types'
import { Badge } from 'react-bootstrap'
import Avatar from './Avatar'
import UseAllUserChats from '../../utils/hooks/useAllUserChats';

interface ChatItemProps {
    isActive: boolean
    chat: ChatTypes
    userId: string
    name: string
    urlChatId: string
}

const ChatItem: FC<ChatItemProps> = ({ chat, isActive, userId, name, urlChatId }): ReactElement => {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const history = useHistory();
    const { 
      addToUnredCounter,
      socket,
    } = UseAllUserChats();

    useEffect(() => {
        if (chat?.messages?.length > 0) {
          const counter = chat.messages.filter((message) => message.receiverHasRead === false && message.createdBy !== userId).length;
          setUnreadMessages(unreadMessages => unreadMessages + counter);
        }
    }, [chat]);
    
    useEffect(() => {
      if (chat?.messages?.length > 0 && unreadMessages > 0 && chat?._id === urlChatId) {
        const counter = chat.messages.filter((message) => message.receiverHasRead === false && message.createdBy !== userId)?.length;
        setUnreadMessages(messages => messages - counter);
        addToUnredCounter(counter, 'decrement');
      }
    }, [urlChatId, chat]);

    const handleClickChat = (id) => {
      history.push(`/chats/${id}`)
      if (unreadMessages > 0) {
        console.log('EMIT SOCKET lukee viestin')
        socket.emit('readMessages', { userId, chatId: chat._id});
      }
    };

    const getInitials = (name) => {
     let initials = name.split(' ');

      if(initials?.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name?.substring(0, 2);
      }

      return initials?.toUpperCase();
    };

    return (
        <Container 
          className="my-2 d-flex border-bottom border-dark" 
          isActive={isActive}
          onClick={() => handleClickChat(chat._id)}
        >
          <Avatar initials={getInitials(name)} />
          <small className="p-2">{name}</small>
          {unreadMessages > 0 && <StyledBadge pill bg="danger">{unreadMessages}</StyledBadge>}
        </Container>
    )
}

type PropType = {
  isActive?: boolean
}

const Container = styled.div<PropType>`
    padding: 5px 5px 0 5px;
    border-radius: 5px;
    outline: ${props => props.isActive ? "1px solid #00fff1 !important" : "none"};
    &:hover {
      cursor: pointer;
    }
`;

const StyledBadge = styled(Badge)`
  background: red !important;
  height: 20px;
  font-size: .7rem;
  color: #fff;
  border-radius: 50%;
`;

export default ChatItem;
