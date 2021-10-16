import React, { FC, ReactElement, useState } from 'react'
import {
  Form,
  ButtonGroup,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import styled from 'styled-components';
import { genders, userTypes, regions } from "../config/config";
import { UserFormTypes } from '../types';

interface UserFormProps {
    form: UserFormTypes,
    setForm: (form: UserFormTypes) => void,
    errors: UserFormTypes,
    isRegisterView: boolean,
}

const UserForm: FC<UserFormProps> = ({ form, setForm, errors, isRegisterView }): ReactElement => {

  const handleFields = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

    return (
        <Form>
        <Form.Group controlId="name">
          <Form.Label>Nimi</Form.Label>
          <Form.Control
            type="name"
            placeholder="Koko nimesi"
            value={form.name}
            onChange={({ currentTarget }) => handleFields('name', currentTarget.value)}
            isInvalid={!!errors.name}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.name }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            placeholder="Sähköpostisi"
            isInvalid={!!errors.email}
            onChange={({ currentTarget }) => handleFields('email', currentTarget.value)}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.email }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="d-block">Asiakas vai avustaja?</Form.Label>
          <ButtonGroup>
            {userTypes.map((user, idx) => (
              <CheckButton
                key={idx}
                id={`radio-${user.key}`}
                value={user.key}
                isInvalid={!!errors.userType}
                toggled={form.userType === user.key} 
                onClick={({ target }) => handleFields('userType', target.value)}
              >
                {user.label}
              </CheckButton>
            ))}
          </ButtonGroup>
              {!!errors.userType && (
              <p style={{ fontSize: '.7rem', color: '#d9534f' }} className="mt-1">
                { errors.userType }
               </p>
              )}
        </Form.Group>

        <Form.Group>
          <Form.Label className="d-block">Sukupuoli</Form.Label>
          <ButtonGroup>
            {genders.map((g, idx) => (
              <CheckButton
                key={idx}
                id={`radio-${idx}`}
                value={g.key}
                toggled={form.gender === g.key}
                onClick={({ target }) => handleFields('gender', target.value)}
              >
                {g.label}
              </CheckButton>
            ))}
          </ButtonGroup>
        </Form.Group>

        <Form.Group controlId="region">
          <Form.Label>Maakunta</Form.Label>
          <Form.Control
            as="select"
            isInvalid={!!errors.region}
            onChange={({ target }) => handleFields('region', target.value)}
          >
            {regions.map((r) => (
              <option value={r} key={r}>{r}</option>
            ))}
            </Form.Control>
          <Form.Control.Feedback type='invalid'>
            { errors.region }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control
            type="number"
            placeholder="Kirjoita puhelinnumero"
            value={form.phone}
            onChange={({ currentTarget }) => handleFields('phone', currentTarget.value)}
            isInvalid={!!errors.phone}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.phone}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Kuvaus</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Kerro tähän vähän itsestäsi"
            value={form.description}
            onChange={({ currentTarget }) => handleFields('description', currentTarget.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Kokemus</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Kerro lyhyesti avustaja kokemuksestasi"
            value={form.experience}
            onChange={({ currentTarget }) => handleFields('experience', currentTarget.value)}
          ></Form.Control>
        </Form.Group>

      {!isRegisterView && (
        <Row>
        <Form.Group as={Col}>
          <Form.Label>Kiireellinen aika alkaa</Form.Label>
          <DatePicker 
          selected={moment(form?.busyStartDate).toDate()} 
          dateFormat="dd.MM.yyy"
          locale="fi"
          name="busyStartDate"
          className="form-control"
          onChange={(date) => handleFields('busyStartDate', date)} />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Kiireellinen aika loppuu</Form.Label>
          <DatePicker 
          dateFormat="dd.MM.yyy"
          locale="fi"
          name="busyEndDate"
          className="form-control"
          selected={moment(form?.busyEndDate).toDate()} 
          onChange={(date) => handleFields('busyEndDate', date)} />
        </Form.Group>
        </Row>
      )}

        <Form.Group controlId="password">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type="password"
            required
            value={form.password}
            placeholder="Salasanasi"
            onChange={({ currentTarget }) => handleFields('password', currentTarget.value)}
            isInvalid={!!errors.password}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.password }
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Vahvista salasanasi</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Vahvista salasanasi"
            value={form.confirmPassword}
            onChange={({ currentTarget }) => handleFields('confirmPassword', currentTarget.value)}
            isInvalid={!!errors.confirmPassword}
        />
          <Form.Control.Feedback type='invalid'>
            { errors.confirmPassword }
        </Form.Control.Feedback>
        </Form.Group>
        </Form>
    );

};


export const CheckButton = styled(Button)`
  background-color: ${props => props.toggled ? '#83c5be' : '#edf6f9'};
  color: #2b2d42;

  &:hover {
  background-color: #83c5be;
  }
  &:active {
    outline: none !important;
    outline-offset: none !important;
    background: transparent !important;
  }
`;

export default UserForm;