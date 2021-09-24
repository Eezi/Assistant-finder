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
    <div className="text-center">
      <h5>{initials}</h5>
    </div>
  </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
    width: 40px;
    height: 40px;
    padding-top: 10px;
    border-radius: 50%;
    background: cyan; 
    margin-right: 20px;
    position: relative;
`;

export default Avatar;
