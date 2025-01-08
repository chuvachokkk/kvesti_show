import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/quests">Все квесты</Link>
        <Link to="/add-quest">Добавить квест</Link>

        {isAuthenticated && user ? (
          <>
            <span>Привет, {user.username}!</span>
            <Link to="/profile">Личный кабинет</Link>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <Link to="/auth">Войти</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
