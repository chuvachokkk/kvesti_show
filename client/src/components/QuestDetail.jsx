import React from 'react';

const QuestDetail = ({ quest }) => {
  return (
    <div className="quest-detail">
      <h1>{quest.title}</h1>
      <img src={`http://localhost:3000${quest.image}`} alt={quest.title} />
      <p>{quest.description}</p>
      <div>
        <h2>Характеристики:</h2>
        <ul>
          <li>Команда: {quest.teamSize}</li>
          <li>Время: {quest.duration}</li>
          <li>Сложность: {quest.difficulty}</li>
          <li>Страх: {quest.fearLevel}</li>
          <li>Возраст: {quest.ageLimit}</li>
          <li>Загадки: {quest.puzzlesCount}</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestDetail;
