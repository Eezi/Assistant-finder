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
      <h5 className="text-white text-center">{initials}</h5>
  </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
    width: 52px;
    height: 46px;
    padding-top: 13px;
    border-radius: 50%;
    background: #4462ff; 
    color: #fff;
    position: relative;
    margin-bottom: 10px;

`;

export default Avatar;
