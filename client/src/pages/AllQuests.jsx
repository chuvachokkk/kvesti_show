import React from 'react';
import QuestList from '../components/QuestList';

const AllQuests = () => {
  const allQuests = [
    {
      id: 1,
      title: 'Квест 1',
      description: 'Описание квеста 1',
      image: 'тут должна быть картинка',
    },
    {
      id: 2,
      title: 'Квест 2',
      description: 'Описание квеста 2',
      image: 'тут должна быть картинка',
    },
  ];

  return (
    <div>
      <h1>Все квесты</h1>
      <QuestList quests={allQuests} />
    </div>
  );
};

export default AllQuests;
