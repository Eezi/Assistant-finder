import React, { useEffect } from "react";
import Message from "../components/Message";
import ChatList from '../components/Chat/ChatList';
import ChatProfile from '../components/Chat/ChatProfile';
import {
  Row,
  Col,
} from "react-bootstrap";
import ChatContent from "../components/Chat/ChatContent";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  return (
    <div className="h-100">
    <h1 style={{paddingLeft: '16px'}}>Keskustelut</h1>
    <Row>
      <Col className="h-100 border border-dark">
        {/* Lista chateista */}
        <ChatList />
      </Col>
      <Col className="h-100 d-inline-block border border-dark" md={8}>
       <ChatContent /> 
      </Col>
      <Col className="bg-secondary border border-dark" md={2}>
        {/* User Profile jonka kanssa chattailee */}
        <ChatProfile />
      </Col>
    </Row>
  </div>
  );
};
export default CartScreen;
