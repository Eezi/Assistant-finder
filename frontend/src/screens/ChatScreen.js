import React, { useEffect } from "react";
import Message from "../components/Message";
import ChatList from '../components/Chat/ChatList';
import ChatProfile from '../components/Chat/ChatProfile';
import {
  Row,
  Col,
} from "react-bootstrap";
import { getChatById } from '../actions/chatActions';
import { useSelector, useDispatch } from "react-redux";
import ChatContent from "../components/Chat/ChatContent";
import Loader from "../components/Loader";

const ChatScreen = ({ match }) => {
  const chatId = match.params.id;
  const dispatch = useDispatch();

  const chatData = useSelector((state) => state.getChat);
  const { chat, loading } = chatData;

  useEffect(() => {
    if (chatId) {
      dispatch(getChatById(chatId));
    }
  }, [chatId, dispatch]);

  if (loading) return <Loader />

  return (
    <div className="h-100">
    <h1 style={{paddingLeft: '16px'}}>Keskustelut</h1>
    <Row>
      <Col className="h-100 border border-dark">
        {/* Lista chateista */}
        <ChatList />
      </Col>
      <Col className="h-100 d-inline-block border border-dark" md={8}>
       <ChatContent chatMessages={chat?.messages} /> 
      </Col>
      <Col className="bg-secondary border border-dark" md={2}>
        {/* User Profile jonka kanssa chattailee */}
        <ChatProfile />
      </Col>
    </Row>
  </div>
  );
};
export default ChatScreen;
