import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Form, Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../actions/chatActions";

const UserCard = ({ cardInfo, userId, index, users }) => {
  const { description, name, phone, email, gender, region, _id, experience } = cardInfo;
  const dispatch = useDispatch();
  const [allowPush, setAllowPush] = useState(false);
  const history = useHistory();
  const chatCreatedData = useSelector((state) => state.chatCreate);
  const { chat, loading } = chatCreatedData;

  useEffect(() => {
    if (!loading && chat && allowPush) {
      history.push(`/chats/${chat?._id}`);
      setAllowPush(false);
    }
  }, [chat, loading, history, allowPush]);

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
    setAllowPush(true);
  };

  return (
    <StyledCard style={{ width: "20rem" }} className="text-dark">
      <Card.Body>
        <Card.Title className="text-center mb-4">{name}</Card.Title>
        <Hr />

       <Toggle className="border-0 bg-transparent" fluid eventKey={_id}>
          <Div>
          <h6 className="d-inline mr-2">Näytä Lisätiedot</h6>
          <i className="fa fa-angle-down"></i>
        </Div>
      </Toggle>
      <Accordion.Collapse className="pt-3" eventKey={_id}>
        <div style={{ wordWrap: 'break-word' }}>
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
        {gender && (
        <Form.Group>
          <Form.Label className="text-muted">Sukupuoli</Form.Label>
          <p>{checkGender()}</p>
        </Form.Group>
        )}
        <Hr />
        {description && (
        <Form.Group>
          <Form.Label className="text-muted">Kuvaus</Form.Label>
          <p>{description}</p>
        </Form.Group>
        )}
        <Hr />
        {experience && (
        <Form.Group>
          <Form.Label className="text-muted">Kokemus</Form.Label>
          <p>{experience}</p>
        </Form.Group>
        )}

        </div>

      </Accordion.Collapse>
      </Card.Body>
      <Card.Footer className="text-center bg-transparent">
        <ChatButton onClick={handleCreateChat}>Avaa keskustelu</ChatButton>
        </Card.Footer>
    </StyledCard>
  );
};

export default UserCard;

const StyledCard = styled(Card)`
  border-radius: 5px;
  background: hsla(0, 0%, 100%, 1);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Div = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Toggle = styled(Accordion.Toggle)`
  &:focus {
    outline: none !important;
  }
`;

const ChatButton = styled.button`
  padding: .7rem;
  border-radius: 23px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  text-transform: uppercase;
  color: #F5F7FF;
  border: none;
  background-color: #1f223d;

  &:hover {
    transform: scale(1.05);
    transition: all .2s ease-in-out;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  }
`;
const Hr = styled.hr`
  background-color: #585858;
`;
