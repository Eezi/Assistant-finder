import React, { useState } from 'react';

const NewMessage = ({ socket, userId }) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', { message: value, userId });
    setValue('');
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={value}
        placeholder="Type your message"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <button onClick={submitForm}>Lähetä</button>
    </form>
  );
};

export default NewMessage;