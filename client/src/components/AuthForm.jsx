import React, { useState, useContext } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = type === 'login' ? '/auth/signin' : '/auth/signup';
    const data =
      type === 'login' ? { email, password } : { username, email, password };

    try {
      const response = await axiosInstance.post(endpoint, data);
      const { accessToken, user } = response.data;

      login({ ...user, accessToken });

      navigate('/');
    } catch (error) {
      console.error(
        'Ошибка при авторизации:',
        error.response ? error.response.data : error.message
      );
      alert('Ошибка при авторизации. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Вход' : 'Регистрация'}</h2>

      {type === 'register' && (
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">
        {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default AuthForm;
