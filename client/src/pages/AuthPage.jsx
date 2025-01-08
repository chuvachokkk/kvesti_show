import React from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div>
      <h1>Вход / Регистрация</h1>
      <div>
        <h2>Вход</h2>
        <AuthForm type="login" />
      </div>
      <div>
        <h2>Регистрация</h2>
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default AuthPage;
