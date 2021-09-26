import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, myOrders } = orderMyList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user.id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col style={{marginLeft: '4rem'}} md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email Adress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" varian="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={8}>
        <h1>Orders</h1>
  {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger" >{errorOrders}</Message>
   : (
     <Table striped bordered hover responsive className="table-sm">
       <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
       </thead>
       <tbody>
         {myOrders.map(order => (
           <tr key={order._id}>
             <td>{order._id}</td>
             <td>{order.createdAt?.substring(0, 10)}</td>
             <td>{order.totalPrice}€</td>
             <td>
               {order.isPaid ? order.paidAt.substring(0, 10) : (
                 <i className="fas fa-times" style={{color: 'red'}}></i>
               )}
               </td>
             <td>
               {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                 <i className="fas fa-times" style={{color: 'red'}}></i>
               )}
             </td>
             <td>
               <LinkContainer to={`/order/${order._id}`}>
                  <Button className="btn-sm" variant="light">Details</Button>
               </LinkContainer>
             </td>


           </tr>
         ))}
       </tbody>
     </Table>
   )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
