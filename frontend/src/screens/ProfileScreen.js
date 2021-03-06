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
  const [successMessage, setSuccessMessage] = useState('');
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
        if (Object.keys(form).length <= 0) {
          setForm({ ...rest });
        }
      }
    }
  }, [dispatch, history, userInfo, user, success, form]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = checkFormValues(form);
    if (Object.keys(newErrors).length > 0) return;
    const { confirmPassword, ...rest } = form;
    dispatch(updateUserProfile({ ...rest }));
    handleSuccess();
  };

  const handleSuccess = () => {
    setSuccessMessage('Tiedot pävitetty!');

    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  }

  return (
    <Row className="justify-content-center mb-4">
      <Col md={6}>
        <h1>Käyttäjän profiili</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <UserForm errors={errors} form={form} setForm={setForm} />
        <p style={{ color: 'green' }}>{successMessage}</p>
        <Button onClick={submitHandler} varian="primary">
          Päivitä tiedot
        </Button>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
