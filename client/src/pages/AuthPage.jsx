import React from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div>
      <h1>Вход / Регистрация</h1>
      <AuthForm type="login" />
      <AuthForm type="register" />
    </div>
  );
};

export default AuthPage;
