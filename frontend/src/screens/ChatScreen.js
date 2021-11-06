import React, { useEffect } from "react";
import Message from "../components/Message";
import ChatList from '../components/Chat/ChatList';
import ChatProfile from '../components/Chat/ChatProfile';
import {
  Row,
  Col,
  Button,
} from "react-bootstrap";
import EmptyState from '../components/EmptyState';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getChatById, getUserChats } from '../actions/chatActions';
import { getUserDetails } from '../actions/userActions';
import { useSelector, useDispatch } from "react-redux";
import ChatContent from "../components/Chat/ChatContent";
import Loader from "../components/Loader";

const ChatScreen = ({ match }) => {
  const chatId = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  const chatData = useSelector((state) => state.getChat);
  const { chat, loading } = chatData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingUser } = userLogin;

  const participated = useSelector((state) => state.userDetails);
  const { user: participatedUser, loading: loadingParticipated } = participated;

  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;

  useEffect(() => {
    if (!allUserChats) {
      dispatch(getUserChats());
    }
    if (!chatId && allUserChats?.length > 0) {
      history.push(`/chats/${allUserChats[0]?._id}`)
    }
  }, [dispatch, allUserChats, history, chatId]);

  useEffect(() => {
    if (chatId) {
      dispatch(getChatById(chatId));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (chat && !loading) {
      const rightId = chat.participatedUser === userInfo._id ? chat.createdBy : chat.participatedUser;
      dispatch(getUserDetails(rightId));
    }
  }, [loading, chat, dispatch, userInfo])

  if (loading || loadingUser || loadingParticipated) return <Loader />

 if (allUserChats?.length <= 0) {
  return <EmptyState 
    title="Ei vielä yhtään avattua keskustelua" 
    subTitle="Palaa etusivulle" 
    submitButton={<Button onClick={() => history.push('/')}>Tästä</Button>} />
 }

  return (
    <Div className="h-100">
    <Row >
      <Col style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px', background: '#1f223d' }}>
        <ChatList allUserChats={allUserChats} chatId={chatId} loading={loadingChats} userId={userInfo?._id} />
      </Col>
      <MainCol style={{ background: '#fff' }} className="h-100 d-inline-block" md={7}>
       <ChatContent user={userInfo} chatId={chatId} loading={loading} participatedUser={participatedUser} chatMessages={chat?.messages} /> 
      </MainCol>
      <Col style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px', background: '#1f223d' }}>
        <ChatProfile loading={loading} {...participatedUser} />
      </Col>
    </Row>
  </Div>
  );
};

const MainCol = styled(Col)`
`;

//border-right: 2px solid #a1a1a1;
//box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;

//box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
const Div = styled.div`
box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

export default ChatScreen;
