import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Личный кабинет</h1>
      {user ? (
        <div>
          <p>Имя пользователя: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Пожалуйста, войдите в систему.</p>
      )}
    </div>
  );
};

export default ProfilePage;
