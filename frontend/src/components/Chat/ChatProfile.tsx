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
        <div style={{ wordWrap: 'break-word' }} className="container-fluid min-h-75 text-center p-1">
          <div className="pt-2">
            <h5>{name}</h5>
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