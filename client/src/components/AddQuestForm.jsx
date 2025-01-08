import React, { useState } from 'react';

const AddQuestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [fearLevel, setFearLevel] = useState('');
  const [ageLimit, setAgeLimit] = useState('');
  const [puzzlesCount, setPuzzlesCount] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить квест</h2>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Команда"
        value={teamSize}
        onChange={(e) => setTeamSize(e.target.value)}
      />
      <input
        type="text"
        placeholder="Время"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Сложность"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Страх"
        value={fearLevel}
        onChange={(e) => setFearLevel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Возраст"
        value={ageLimit}
        onChange={(e) => setAgeLimit(e.target.value)}
      />
      <input
        type="number"
        placeholder="Количество загадок"
        value={puzzlesCount}
        onChange={(e) => setPuzzlesCount(e.target.value)}
      />
      <textarea
        placeholder="Особенности"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddQuestForm;
