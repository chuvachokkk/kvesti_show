import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({ user, isAuthenticated, logout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Квесты
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/quests">
              Все квесты
            </Nav.Link>
            <Nav.Link as={Link} to="/add-quest">
              Добавить квест
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated && user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Личный кабинет
                </Nav.Link>
                <Nav.Link onClick={logout}>Выйти</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/auth">
                Войти
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
