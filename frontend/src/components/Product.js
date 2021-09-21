import React from "react";
import styled from "styled-components";
import { Card, Form } from "react-bootstrap";
import Raiting from "./Raiting";
import { Link } from "react-router-dom";

const UserCard = ({ description, name, phone, email, gender, region, _id }) => {
  const checkGender = () => {
    if (gender === "male") return "Mies";
    if (gender === "female") return "Nainen";
    return "Muu";
  };
  return (
    <StyledCard style={{ width: "20rem" }} className="text-light">
      <Card.Body>
        <Card.Title className="text-center mb-4">{name}</Card.Title>
        <Form.Group>
          <Form.Label className="text-muted">Puhelinnumero</Form.Label>
          <p>{phone}</p>
        </Form.Group>
        <Hr />
        <Form.Group>
          <Form.Label className="text-muted">Sähköposti</Form.Label>
          <p>{email}</p>
        </Form.Group>
        <Hr />
        <Form.Group>
          <Form.Label className="text-muted">Maakunta</Form.Label>
          <p>{region}</p>
        </Form.Group>
        <Hr />
        <Form.Group>
          <Form.Label className="text-muted">Sukupuoli</Form.Label>
          <p>{checkGender()}</p>
        </Form.Group>
        <Hr />
        <Form.Group>
          <Form.Label className="text-muted">Kuvaus</Form.Label>
          <p>{description}</p>
        </Form.Group>
      </Card.Body>
    </StyledCard>
  );
};

export default UserCard;

const StyledCard = styled(Card)`
  border-radius: 5px;
  background: linear-gradient(180deg, hsla(0, 0%, 20%, 0.9) 0%, hsla(0, 0%, 12%, 1) 100%);

`;
const Hr = styled.hr`
  background-color: #585858;
`;