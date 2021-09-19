import React, { FC, ReactElement } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const Footer: FC<{}> = (): ReactElement => {
  return (
    <Footter >
      <Container>
        <Row>
          <Col className="text-center py-3"><p>Copyright &copy; Assistant-Finder</p></Col>
        </Row>
      </Container>
    </Footter>
  );
}

export default Footer;

const Footter = styled.footer`
  background: transparent;
  bottom: 0;
  position: fixed;
  width: 100%;  
`;