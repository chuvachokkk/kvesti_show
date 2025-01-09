import React from 'react';
import { useParams } from 'react-router-dom';
import QuestDetail from '../components/QuestDetail';
import CommentsSection from '../components/CommentsSection';

const QuestPage = () => {
  const { id } = useParams();
  const quest = {
    id: 1,
    title: 'Квест 1',
    description: 'Описание квеста 1',
    image: 'тут должна быть картинка',
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
      <CommentsSection questId={id} /> {/* Добавляем секцию комментариев */}
    </div>
  );
};

export default QuestPage;
