import React, { FC, ReactElement, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { getUserChats} from '../../actions/chatActions';
import { getParticipatedUsers } from '../../actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { ChatTypes } from '../../types';
import ChatItem from './ChatItem';

interface ChatListProps {
  userId: string
  chatId: string
  allUserChats: ChatTypes[]
  loading: boolean
}

const ChatList: FC<ChatListProps> = ({ userId, allUserChats, loading, chatId }) => {
  const allUsers = useSelector((state) => state.participatedUsers);
  const { participatedUsers, loading: loadingUsers } = allUsers;
  const dispatch = useDispatch();


  useEffect(() => {
    // Haetaan käyttäjän chattien osapuolien userIdt
    // Joilla haetaan käyttäjien tiedot
    if (allUserChats?.length > 0 && allUserChats && !loading) {
      const participatedIds = 
      allUserChats?.map((chat) => chat.participatedUser).
      concat(allUserChats.map((chat) => chat.createdBy))?.filter((id) => id !== userId);
      
      dispatch(getParticipatedUsers(participatedIds));
    }

  }, [allUserChats, loading, dispatch, userId]);

  const activeChat = allUserChats?.find((chat) => chat._id === chatId);
  const currentChatUserId = participatedUsers.find((user) => user._id === activeChat?.participatedUser || user._id === activeChat?.createdBy)?._id;

 if (loading || loadingUsers) return <Loader />;

   return (
     <div className="min-h-75 py-3">
      <Row className="justify-content-center text-light">
      <Col>
        <h6 className="my-3 text-center text-light">Keskustelut</h6>
      {allUserChats?.map((chat, index) => {
      const name = participatedUsers?.find((user) => user._id === chat.participatedUser || user._id === chat.createdBy)?.name;
        if (!name) return null;
        return (
        <ChatItem 
          isActive={currentChatUserId === chat.participatedUser || currentChatUserId === chat.createdBy} 
          urlChatId={chatId}
          userId={userId}
          chat={chat}
          key={chat._id}
          name={name}>
        </ChatItem>
      )})}
      </Col>
     </Row>
  </div>
  )

}

export default ChatList;
