import React, { FC, ReactElement, useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

interface User {
  description: string,
  name: string,
  phone: string,
  email: string,
  region: string,
  userType: string,
}

const ChatProfile: FC<User> = ({ description, name, phone, email, region, userType }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="container-fluid min-h-75 text-center p-2">
          <div className="">
            <h5>{name}</h5>
            <p>{userType === 'customer' ? 'Asiakas' : 'Avustaja'}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{region}</p>
          </div>
          {description && (
            <div className="role-button" onClick={() => setOpen(!open)}>
              <h6 className="d-inline mr-2">Lisätiedot</h6>
              <i className="fa fa-angle-down"></i>
            <Collapse in={open}>
        <div id="example-collapse-text">
          {description}
        </div>
      </Collapse>
          </div>
          )}
        </div>
      );

}

export default ChatProfile;