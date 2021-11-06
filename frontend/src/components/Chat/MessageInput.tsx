import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Row, Col } from 'react-bootstrap';

const NewMessage = ({ socket, userId, chatId }) => {
  const [value, setValue] = useState('');
  
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', { message: value, userId, chatId});
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
     <Form.Group as={Row} className="mt-4 justify-content-center">
    <Col md="10">
      <FormControl
        autoFocus
        className="d-inline"
        value={value}
        placeholder="Kirjoita viesti avustajalle"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      </Col>
      <Col md="2" className="text-center">
      <SubmitButton type="submit">Lähetä
      <i className="fa-solid fa-paper-plane-top"></i>
      </SubmitButton>
    </Col>
      </Form.Group>
</form>
  );
};

const SubmitButton = styled(Button)`
  background: #00fff1 !important;
  color: #1f223d;
  border-radius: 10px;
  height: 2.8rem;

  @media (max-width: 650px) {
    margin-top: 1rem;
  }
`;

const FormControl = styled(Form.Control)`
  background: #fff !important;
  height: 2.8rem;
  border: 2px solid #1f223d;
  border-radius: 5px;
`;

export default NewMessage;
