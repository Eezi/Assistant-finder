import React, { FC, ReactElement, useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

const ChatProfile: FC<{}> = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="container-fluid min-h-75 text-center p-2">
          <div className="">
            <div className="">
              <img src="" />
            </div>
            <h5>Fernando Faucho</h5>
            <p>CEO Founder at Highly Inc</p>
          </div>
          <div className="">
            <div className="role-button" onClick={() => setOpen(!open)}>
              <h6 className="d-inline mr-2">Lisätiedot</h6>
              <i className="fa fa-angle-down"></i>
            </div>
            <Collapse in={open}>
        <div id="example-collapse-text">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
          labore wes anderson cred nesciunt sapiente ea proident.
        </div>
      </Collapse>
          </div>
        </div>
      );

}

export default ChatProfile;