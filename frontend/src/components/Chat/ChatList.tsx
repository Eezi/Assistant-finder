import React, { FC, ReactElement } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Avatar from './Avatar'

const users = [
  { name: 'Heini Kenkimäki' },
  { name: 'Tomi Salo' },
  { name: 'Vili Vepsä' },
  { name: 'Antti Äijö' },
]
const ChatList: FC<{}> = () => {

  const getInitials = (name): string => {
  let initials = name.split(' ');

  if(initials.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name.substring(0, 2);
  }

  return initials.toUpperCase();
}

    return (
        <Row className="justify-content-center">
          <Col className="text-center my-3">
            <Button>
            <i className="fas fa-plus mr-2"></i>    
             Uusi 
             </Button>
      </Col>
      <Col>
        <h6 className="mb-3">Keskustelut</h6>
      {users.map(({name}) => (
        <div className="my-2 d-flex boder border-secondary p-1" key={name}>
        <Avatar initials={getInitials(name)} />
        <small className="mt-2">{name}</small>
        </div>
      ))}
      </Col>
        </Row>
    )

}

export default ChatList;
