import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/quests">Все квесты</Link>
        <Link to="/add-quest">Добавить квест</Link>
        <Link to="/auth">Войти</Link>
      </nav>
    </header>
  );
};

export default Header;
