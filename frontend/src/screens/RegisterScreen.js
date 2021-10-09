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
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { regions } from '../config/config';
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { genders, userTypes } from "../config/config";

const RegisterScreen = ({ location, history }) => {
  const [form, setForm] = useState({});
  const [ errors, setErrors ] = useState({})
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

  const findFormErrors = () => {
    const newErrors = {}
    if ( !form.name || form.name === '' ) newErrors.name = 'Nimi ei voi olla tyhjä'
    if ( !form.phone || form.phone === '' ) newErrors.phone = 'Puhelinnumero pitää täyttää'
    if ( !form.email || form.email === '' ) newErrors.email = 'Sähköposti pitää täyttää'
    if ( !form.region || form.region === '' ) newErrors.region = 'Paikkakunta pitää valita'
    if ( !form.userType || form.userType === '' ) newErrors.userType = 'Käyttäjätyyppi pitää valita'
    if ( !form.password || form.password === '' ) newErrors.password = 'Salasana puuttuu'
    if ( !form.confirmPassword || form.confirmPassword === '' ) newErrors.confirmPassword = 'Vahvistussalasana puuttuu'

    return newErrors
  };

  const handleFields = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      return setErrors(newErrors);
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Salasanat eivät täsmää");
    } else {
      const user = {
        name: form.name,
        email: form.email,
        password: form.password,
        gender: form.gender,
        region: form.region,
        description: form.description,
        phone: form.phone,
        userType: form.userType,
        experience: form.experience,
      };
      dispatch(register(user));
    }
  };

  return (
    <FormContainer>
      <h1>Rekisteröityminen</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Nimi</Form.Label>
          <Form.Control
            type="name"
            placeholder="Koko nimesi"
            value={form.name}
            onChange={({ currentTarget }) => handleFields('name', currentTarget.value)}
            isInvalid={!!errors.name}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.name }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            placeholder="Sähköpostisi"
            isInvalid={!!errors.email}
            onChange={({ currentTarget }) => handleFields('email', currentTarget.value)}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.email }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="d-block">Asiakas vai avustaja?</Form.Label>
          <ButtonGroup>
            {userTypes.map((user, idx) => (
              <CheckButton
                key={idx}
                id={`radio-${user.key}`}
                value={user.key}
                isInvalid={!!errors.userType}
                toggled={form.userType === user.key} 
                onClick={({ target }) => handleFields('userType', target.value)}
              >
                {user.label}
              </CheckButton>
            ))}
          </ButtonGroup>
              {!!errors.userType && (
              <p style={{ fontSize: '.7rem', color: '#d9534f' }} className="mt-1">
                { errors.userType }
               </p>
              )}
        </Form.Group>

        <Form.Group>
          <Form.Label className="d-block">Sukupuoli</Form.Label>
          <ButtonGroup>
            {genders.map((g, idx) => (
              <CheckButton
                key={idx}
                id={`radio-${idx}`}
                value={g.key}
                toggled={form.gender === g.key}
                onClick={({ target }) => handleFields('gender', target.value)}
              >
                {g.label}
              </CheckButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group controlId="region">
          <Form.Label>Maakunta</Form.Label>
          <Form.Control
            as="select"
            isInvalid={!!errors.region}
            onChange={({ target }) => handleFields('region', target.value)}
          >
            {regions.map((r) => (
              <option value={r} key={r}>{r}</option>
            ))}
            </Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.region }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control
            type="number"
            placeholder="Kirjoita puhelinnumero"
            value={form.phone}
            onChange={({ currentTarget }) => handleFields('phone', currentTarget.value)}
            isInvalid={!!errors.phone}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.phone}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Kuvaus</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Kerro tähän vähän itsestäsi"
            value={form.description}
            onChange={({ currentTarget }) => handleFields('description', currentTarget.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Kokemus</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Kerro lyhyesti avustaja kokemuksestasi"
            value={form.experience}
            onChange={({ currentTarget }) => handleFields('experience', currentTarget.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            value={form.password}
            placeholder="Salasanasi"
            onChange={({ currentTarget }) => handleFields('password', currentTarget.value)}
            isInvalid={!!errors.password}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.password }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Vahvista salasanasi</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Vahvista salasanasi"
            value={form.confirmPassword}
            onChange={({ currentTarget }) => handleFields('confirmPassword', currentTarget.value)}
            isInvalid={!!errors.confirmPassword}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.confirmPassword }
        </Form.Control.Feedback>
        </Form.Group>

        <Button onClick={submitHandler} varian="primary">
          Rekiteröidy
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Onko sinulla jo tili?{" "}
          <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
            Kirjaudu täältä
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

const CheckButton = styled(Button)`
  background-color: ${props => props.toggled ? '#83c5be' : '#edf6f9'};
  color: #2b2d42;

  &:hover {
  background-color: #83c5be;
  }
  &:active {
    outline: none !important;
    outline-offset: none !important;
    background: transparent !important;
  }
`;

export default RegisterScreen;
