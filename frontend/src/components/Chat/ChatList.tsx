import React, { FC, ReactElement, useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Avatar from './Avatar'
import { getUserChats } from '../../actions/chatActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader';
import { useHistory } from 'react-router-dom';

const users = [
  { name: 'Heini Kenkimäki' },
  { name: 'Tomi Salo' },
  { name: 'Vili Vepsä' },
  { name: 'Antti Äijö' },
]
const ChatList: FC<{}> = () => {

  // Tää setti varmaan screen componenttiin koska muuten vaikee saada participantsUsers???
  const allChats = useSelector((state) => state.userChats);
  const { allUserChats, loading: loadingChats } = allChats;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!allUserChats) {
      dispatch(getUserChats());
    }
  }, [dispatch, allUserChats]);

  const getInitials = (name): string => {
  let initials = name.split(' ');

  if(initials.length > 1) {
    initials = initials.shift().charAt(0) + initials.pop().charAt(0);
  } else {
    initials = name.substring(0, 2);
  }

  return initials.toUpperCase();
}
const handleClickChat = (id) => {
  history.push(`/chats/${id}`)
};

 if (loadingChats) return <Loader />;

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
      {allUserChats?.map((chat, index) => (
        <div onClick={() => handleClickChat(chat._id)} className="my-2 d-flex boder border-secondary p-1" key={chat._id}>
        {/*}<Avatar initials={getInitials(name)} />*/}
        <small className="mt-2">{`chat-${index}`}</small>
        </div>
      ))}
      </Col>
        </Row>
    )

}

export default ChatList;
