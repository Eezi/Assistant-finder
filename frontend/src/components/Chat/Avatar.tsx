import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

interface AvatarProps {
  initials: string
}

const Avatar = (props: { initials: string }) => {
  const { initials } = props;
  return (
    <AvatarContainer>
      <h6 className="text-center">{initials}</h6>
  </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
    width: 40px;
    height: 40px;
    padding-top: 13px;
    border-radius: 50%;
    background: #00fff1; 
    color: #1f223d;
    position: relative;
    margin-bottom: 10px;

`;

export default Avatar;
