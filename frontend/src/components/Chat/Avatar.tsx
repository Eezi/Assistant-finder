import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const Avatar: FC<{}> = (image: any): ReactElement => {
  return (
    <AvatarContainer>
    <div className="avatar-img">
      <img src={image} alt="#" />
    </div>
    <span className={`isOnline`}></span>
  </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  
    margin-right: 20px;
    position: relative;
`;

export default Avatar;