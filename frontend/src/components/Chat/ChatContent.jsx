import React, { FC, useState, useEffect, useRef } from 'react'
import Avatar from './Avatar'
import styled from 'styled-components'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { Form, Button, Row } from 'react-bootstrap'
import { useSelector } from "react-redux";
import io, { Socket } from 'socket.io-client';

const ChatContent = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  
  useEffect(() => {
    console.log(window.location.hostname)
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

    return (
        <div style={{ minHeight: '550px' }} className="px-2 py-3 mh-100">
          <div className="blocks">
            <div className="current-chatting-user">
              <p>Tomi Hover</p>
            </div>
          </div>

        {/*<div className="content__body">
          <div className="chat__items">
            this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })
            <div />
          </div>
        </div>*/}
        { socket ? (
        <ChatContainer>
          connected
          <Messages socket={socket} />
          <MessageInput userId={user?._id} socket={socket} />
        </ChatContainer>
      ) : (
        <div>Not Connected</div>
      )}
       {/* <Form.Group className="form-inline text-center">
            <Form.Control
              className="w-75"
              type="text"
              placeholder="Type a message here"
              //onChange={this.onStateChange}
              //value={this.state.msg}
            />
            <Button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </Button>
      </Form.Group>*/}
      </div>
    )
}

const ChatContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 16px;
`;

export default ChatContent
