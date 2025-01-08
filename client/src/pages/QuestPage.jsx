import React from 'react';
import { useParams } from 'react-router-dom';
import QuestDetail from '../components/QuestDetail';

const QuestPage = () => {
  const { id } = useParams();
  const quest = {
    id: 1,
    title: 'Квест 1',
    description: 'Описание квеста 1',
    image: 'https://6-sense.org/assets/images/quests/saw/saw.svg',
    teamSize: '2-4 человека',
    duration: '60 минут',
    difficulty: '2/3',
    fearLevel: '2/3',
    ageLimit: '14+',
    puzzlesCount: 20,
  };

  return (
    <div>
      <QuestDetail quest={quest} />
    </div>
  );
};

export default QuestPage;
