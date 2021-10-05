import React, { FC, ReactElement, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Avatar from './Avatar'
import { getUserChats} from '../../actions/chatActions';
import { getParticipatedUsers } from '../../actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const ChatList: FC<{}> = () => {
  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;
  const allUsers = useSelector((state) => state.participatedUsers);
  const { participatedUsers, loading: loadingUsers } = allUsers;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!allUserChats) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats]);

  useEffect(() => {
    console.log('chatas', allUserChats)
    if (allUserChats?.length > 0) {
      dispatch(getParticipatedUsers(allUserChats.map((chat) => chat.participatedUser)));
    }

  }, [allUserChats, dispatch]);

  const getInitials = (userId): string => {
  const name = participatedUsers.find((user) => user._id === userId)?.name;
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

const getRightUserName = (userId) => {
  const userName = participatedUsers.find((user) => user._id === userId)?.name;
  return (
    <small className="p-2">{userName}</small>
  )
}

 if (loadingChats || loadingUsers) return <Loader />;

   return (
     <div className="min-h-75">
      <Row className="justify-content-center">
      <Col>
        <h6 className="my-3 text-center">Keskustelut</h6>
      {allUserChats?.map((chat, index) => (
        <ChatItem onClick={() => handleClickChat(chat._id)} className="my-2 d-flex border-bottom border-dark" key={chat._id}>
        <Avatar initials={getInitials(chat.participatedUser)} />
        {getRightUserName(chat.participatedUser)}
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
