import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { regions } from '../config/config';
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { genders, userTypes } from "../config/config";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      const user = {
        name,
        email,
        password,
        gender,
        region,
        description,
        phone,
      };
      dispatch(register(user));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          {" "}
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

        <Form.Group>
          <Form.Label className="d-block">Sukupuoli</Form.Label>
          <ButtonGroup>
            {userTypes.map((user, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="success"
                name="radio"
                value={user.key}
                checked={userType === user.key}
                onChange={(e) => setGender(e.currentTarget.value)}
              >
                {user.label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label className="d-block">Asiakas vai avustaja?</Form.Label>
          <ButtonGroup>
            {genders.map((g, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant="success"
                name="radio"
                value={g.key}
                checked={gender === g.key}
                onChange={(e) => setGender(e.currentTarget.value)}
              >
                {g.label}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group controlId="region">
          <Form.Label>Paikkakunta</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option value={r} key={r}>{r}</option>
            ))}
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control
            type="number"
            placeholder="Kirjoita puhelinnumero"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Kuvaus</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Kerro tähän vähän itsestäsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
