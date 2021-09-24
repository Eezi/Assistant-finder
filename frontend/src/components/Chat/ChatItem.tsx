import React, { FC, ReactElement } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ChatItem: FC<{}> = (): ReactElement => {
  return (
    <div
    //style={{ animationDelay: `0.8s` }}
    //className={`chat__item ${this.props.user ? this.props.user : ""}`}
  >
    <div className="chat__item__content">
      <div className="chat__msg">Tere</div>
      <div className="chat__meta">
        <span>16 mins ago</span>
        <span>Seen 1.03PM</span>
      </div>
    </div>
    {/*<Avatar isOnline="active" image={this.props.image} />*/}
  </div>
  );
}

export default ChatItem;