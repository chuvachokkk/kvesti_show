import React from 'react';
import { Link } from 'react-router-dom';
import QuestList from '../components/QuestList';

const HomePage = () => {
  const featuredQuests = [
    // Пример данных
    {
      id: 1,
      title: 'Квест 1',
      description: 'Описание квеста 1',
      image: 'url1',
    },
    {
      id: 2,
      title: 'Квест 2',
      description: 'Описание квеста 2',
      image: 'url2',
    },
  ];

  return (
    <div>
      <h1>Добро пожаловать на сайт квестов!</h1>
      <QuestList quests={featuredQuests} />
      <Link to="/quests">Все квесты</Link>
      <Link to="/add-quest">Добавить квест</Link>
    </div>
  );
};

export default HomePage;
