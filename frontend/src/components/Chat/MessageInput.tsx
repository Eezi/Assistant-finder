import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const NewMessage = ({ socket, userId }) => {
  const [value, setValue] = useState('');
  
  const submitForm = (e) => {
    socket.emit('message', { message: value, userId });
    setValue('');
  };

  return (
     <Form.Group as={Row} className="mt-4">
        <Col md="10">
      <Form.Control
        autoFocus
        className="d-inline"
        value={value}
        placeholder="Kirjoita viesti avustajalle"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      </Col>
      <Col md="2">
      <Button onClick={submitForm}>Lähetä</Button>
    </Col>
      </Form.Group>
  );
};

export default NewMessage;