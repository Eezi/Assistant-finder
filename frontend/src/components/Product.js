import React, { useEffect } from "react";
import styled from "styled-components";
import { Card, Form, Button } from "react-bootstrap";
import Raiting from "./Raiting";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../actions/chatActions";

const UserCard = ({ cardInfo, userId }) => {
  const { description, name, phone, email, gender, region, _id } = cardInfo;
  const dispatch = useDispatch();
  const history = useHistory();

  const chatCreate = useSelector((state) => state.createChat);
  //const { chat } = chatCreate;

  console.log('CHAAAAAT ', chatCreate)

  useEffect(() => {
    if (!!chatCreate && chatCreate?.success) {
      history.push(chatCreate?.chat?._id)
    }
  }, [chatCreate])

  const checkGender = () => {
    if (gender === "male") return "Mies";
    if (gender === "female") return "Nainen";
    return "Muu";
  };


  const handleCreateChat = () => {
    const chat = {
      createdBy: userId,
      participatedUser: _id,
      createdAt: new Date(),
      messages: [],
    };

    dispatch(createChat(chat));
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
      <Card.Footer className="text-center">
        <Button onClick={handleCreateChat}>Avaa keskustelu</Button>
        </Card.Footer>
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