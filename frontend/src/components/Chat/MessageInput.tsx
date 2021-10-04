import React, { useState } from 'react';
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
      <Button type="submit">Lähetä</Button>
    </Col>
      </Form.Group>
</form>
  );
};

export default NewMessage;
