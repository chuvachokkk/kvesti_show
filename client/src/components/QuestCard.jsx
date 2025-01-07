import React from 'react';
import { Link } from 'react-router-dom';

const QuestCard = ({ quest }) => {
  return (
    <div className="quest-card">
      <img src={quest.image} alt={quest.title} />
      <h3>{quest.title}</h3>
      <p>{quest.description}</p>
      <Link to={`/quests/${quest.id}`}>Подробнее</Link>
    </div>
  );
};

export default QuestCard;
