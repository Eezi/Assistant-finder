import React, { useEffect } from "react";
import Message from "../components/Message";
import ChatList from '../components/Chat/ChatList';
import ChatProfile from '../components/Chat/ChatProfile';
import {
  Row,
  Col,
} from "react-bootstrap";
import styled from 'styled-components';
import { getChatById, getUserChats } from '../actions/chatActions';
import { getUserDetails } from '../actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import ChatContent from "../components/Chat/ChatContent";
import Loader from "../components/Loader";

const ChatScreen = ({ match }) => {
  const chatId = match.params.id;
  const dispatch = useDispatch();

  const chatData = useSelector((state) => state.getChat);
  const { chat, loading } = chatData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const participated = useSelector((state) => state.userDetails);
  const { user: participatedUser, loading: loadingParticipated } = participated;

  useEffect(() => {
    if (chatId) {
      dispatch(getChatById(chatId));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (chat && !loading) {
      dispatch(getUserDetails(chat.participatedUser))
    }
  }, [loading, chat])

  if (loading || loadingUser || loadingParticipated) return <Loader />

  return (
    <div className="h-100">
    <Row >
      <Col style={{ borderRadius: '5px', background: '#e8e8e8' }}>
        <ChatList />
      </Col>
      <MainCol style={{ background: '#e8e8e8' }} className="h-100 d-inline-block" md={8}>
       <ChatContent user={userInfo} chatId={chatId} loading={loading} participatedUser={participatedUser} chatMessages={chat?.messages} /> 
      </MainCol>
      <Col style={{ borderRadius: '5px', background: '#e8e8e8' }} md={2}>
        <ChatProfile loading={loading} {...participatedUser} />
      </Col>
    </Row>
  </div>
  );
};

const MainCol = styled(Col)`
border-left: 2px solid #a1a1a1;
border-right: 2px solid #a1a1a1;
`;

export default ChatScreen;
