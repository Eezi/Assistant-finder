import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'
import { Navbar, Badge, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from "../actions/userActions";
import UseAllUserChats from '../utils/hooks/useAllUserChats';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { 
    loading,
    allUnreadMessages,
    unreadMessagesPerChat,
    resetMessageCounter,
   } = UseAllUserChats();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
    resetMessageCounter();
  };
  return (
<header>
      <Navbar className="mb-3" style={{padding: '.7rem 1rem', }} bg='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Avustajan Etsijä</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/*<Route render={({ history }) => <SearchBox history={history} />} />*/}
            <Nav className='ml-auto'>
              {userInfo && (
              <LinkContainer to='/chats'>
                <Nav.Link className="text-dark">
                  <i className='fas fa-comments'></i> Keskustelut
                  {allUnreadMessages > 0 && <StyledBadge pill bg="danger">{allUnreadMessages}</StyledBadge>}
                </Nav.Link>
              </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown className="text-dark" title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profiili</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Kirjaudu ulos
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Kirjaudu sisään
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const StyledBadge = styled(Badge)`
  background: red !important;
  font-size: .8rem;
  color: #fff;
  position: absolute;
  top: 5px;
  border-radius: 50%;
`;


export default Header;
