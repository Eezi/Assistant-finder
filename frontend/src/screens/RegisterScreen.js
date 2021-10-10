import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useFormValidation } from '../utils/formValidation'
import UserForm from '../components/UserForm';

const RegisterScreen = ({ location, history }) => {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();
  const { checkFormValues, errors } = useFormValidation();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = checkFormValues(form);
    if (Object.keys(newErrors).length > 0) return;

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
  };

  return (
    <FormContainer>
      <h1>Rekisteröityminen</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <UserForm setForm={setForm} errors={errors} form={form}  />

      <Button onClick={submitHandler} varian="primary">
        Rekiteröidy
      </Button>

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


export default RegisterScreen;
