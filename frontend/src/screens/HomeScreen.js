import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/Product";
import { getUserList } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCaroucel from "../components/ProductCaroucel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    if(userInfo) {
      dispatch(getUserList());
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Meta />
      <H1>Käyttäjät</H1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Div>
          {users.map((item) => (
            <UserCard key={item._id} cardInfo={item} userId={userInfo?._id} />
          ))}
        </Div>
      )}
    </>
  );
};

export default HomeScreen;

const Div = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 6.5rem;
`;

/*const Container = styled.div`
     margin: auto;
     max-width: 900px; 
`;*/

const H1 = styled.h1`
  width: 100%;

  z-index: 2;
`;
