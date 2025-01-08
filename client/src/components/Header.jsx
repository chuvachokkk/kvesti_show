import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';

const Header = ({ user, isAuthenticated, logout }) => {
  return (
    <header>
      <Tab.Container defaultActiveKey="home">
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link as={Link} to="/" eventKey="home">
              Главная
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/quests" eventKey="quests">
              Все квесты
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/add-quest" eventKey="add-quest">
              Добавить квест
            </Nav.Link>
          </Nav.Item>

          {isAuthenticated && user ? (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/profile" eventKey="profile">
                  Личный кабинет
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={logout} eventKey="logout">
                  Выйти
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to="/auth" eventKey="auth">
                Войти
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Tab.Container>
    </header>
  );
};

export default Header;
