import React, { FC, ReactElement, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Avatar from './Avatar'
import { getUserChats} from '../../actions/chatActions';
import { getParticipatedUsers } from '../../actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useHistory } from 'react-router-dom';
import { ChatTypes } from '../../types';
import styled from 'styled-components';

interface ChatListProps {
  userId: string
  allUserChats: ChatTypes[]
  loading: boolean
}

const ChatList: FC<ChatListProps> = ({ userId, allUserChats, loading }) => {
  const allUsers = useSelector((state) => state.participatedUsers);
  const { participatedUsers, loading: loadingUsers } = allUsers;
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (allUserChats?.length > 0 && allUserChats && !loading) {
      const participatedIds = 
      allUserChats?.map((chat) => chat.participatedUser).
      concat(allUserChats.map((chat) => chat.createdBy))?.filter((id) => id !== userId);
      
      dispatch(getParticipatedUsers(participatedIds));
    }

  }, [allUserChats, loading, dispatch]);

  const getInitials = (chat) => {
  const name = participatedUsers?.find((user) => user._id === chat.participatedUser || user._id === chat.createdBy)?.name;
  let initials = name?.split(' ');

  if(initials?.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name?.substring(0, 2);
  }

  return initials?.toUpperCase();
}
const handleClickChat = (id) => {
  history.push(`/chats/${id}`)
};

const getRightUserName = (chat) => {
  const userName = participatedUsers?.find((user) => user._id === chat.participatedUser || user._id === chat.createdBy)?.name;
  return (
    <small className="p-2">{userName}</small>
  )
}

 if (loading || loadingUsers) return <Loader />;


   return (
     <div className="min-h-75">
      <Row className="justify-content-center text-light">
      <Col>
        <h6 className="my-3 text-center text-light">Keskustelut</h6>
      {allUserChats?.map((chat, index) => (
        <ChatItem onClick={() => handleClickChat(chat._id)} className="my-2 d-flex border-bottom border-dark" key={chat._id}>
        <Avatar initials={getInitials(chat)} />
        {getRightUserName(chat)}
        </ChatItem>
      ))}
      </Col>
     </Row>
  </div>
  )

}

const ChatItem = styled.div`
    width: 160px;
    &:hover {
      cursor: pointer;
    }
`;

export default ChatList;
