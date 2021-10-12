import React, { useState, useEffect } from "react";
import { Button, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';
import UserForm from "../components/UserForm";
import { useFormValidation } from '../utils/formValidation'

const ProfileScreen = ({ location, history }) => {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);
  const { checkFormValues, errors } = useFormValidation();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        const { _id, token, ...rest } = user;
        setForm({ ...rest });
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = checkFormValues(form);
    if (Object.keys(newErrors).length > 0) return;
    const { confirmPassword, ...rest } = form;
    dispatch(updateUserProfile({ ...rest }));
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <h1>Käyttäjän profiili</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <UserForm loggedUser={!!userInfo} errors={errors} form={form} setForm={setForm} />

        <Button onClick={submitHandler} varian="primary">
          Päivitä tiedot
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
