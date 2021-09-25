import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import ChatList from '../components/Chat/ChatList';
import ChatProfile from '../components/Chat/ChatProfile';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import ChatContent from "../components/Chat/ChatContent";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart", cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
      history.push('/login?redirect=shipping')
  } 
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
