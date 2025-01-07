import React, { useState } from 'react';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка отправки формы
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Вход' : 'Регистрация'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default AuthForm;
