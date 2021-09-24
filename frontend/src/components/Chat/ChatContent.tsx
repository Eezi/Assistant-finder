import React, { FC } from 'react'
import Avatar from './Avatar'
import { Form, Button, Row } from 'react-bootstrap'

const ChatContent: FC<{}> = () => {

    return (
        <div style={{ minHeight: '550px' }} className="px-2 py-3 mh-100">
          <div className="blocks">
            <div className="current-chatting-user">
              <p>Tomi Hover</p>
            </div>
          </div>

        <div className="content__body">
          <div className="chat__items">
            {/*this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })*/}
            <div />
          </div>
        </div>
        <Form.Group className="form-inline text-center">
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
        </Form.Group>
      </div>
    )
}

export default ChatContent
