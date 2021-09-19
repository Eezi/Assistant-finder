import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Row, Col, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import Raiting from "../components/Raiting";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Img src={product.image}></Img>
            <Info>
              <p>{product.name}</p>
              <hr />
              <Raiting value={product.rating} text={`${product.numReviews}`} />
              <hr />
              <strong>{product.price} €</strong>
              <hr />
              <p>{product.description}</p>
            </Info>
            <Box>
              <p style={{ marginTop: "1rem" }}>{product.price} €</p>
              <hr />
              <p>{product.countInStock < 0 ? "Out of stock" : "In stock"}</p>
              <hr />
              {product.countInStock > 0 && (
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              )}
              <hr />
              <Button onClick={addToCartHandler}>ADD TO CART</Button>
            </Box>
          </>
        )}
      </Container>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No reviews</Message>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Raiting value={review.rating} />
                <p>{review.createdAt?.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;

const Container = styled.div`
  height: 500px;
  width: 100%;
  display: flex;
  display: grid;
  grid-template-columns: 350px 260px 200px;
  justify-content: center;
`;

const Img = styled.img`
  height: 300px;
  justify-self: right;
  margin: auto 0;
`;

const Info = styled.div`
  margin: auto 0;
  padding: 0 2rem;
`;

const Box = styled.div`
  margin: auto 0;
  padding: 0 2rem;
  border: 1px solid #eee;
`;

const Button = styled.button`
  border-radius: 3px;
  background: #303242;
  color: #fff;
  padding: 0.5rem;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
