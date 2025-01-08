import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllQuests from './pages/AllQuests';
import QuestPage from './pages/QuestPage';
import AuthPage from './pages/AuthPage';
import AddQuestPage from './pages/AddQuestPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем, есть ли токен в localStorage при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Функция для входа пользователя
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', userData.accessToken);
  };

  // Функция для выхода пользователя
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  };

  return (
    <Router>
      <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
      <Routes>
        {/* Главная страница доступна всем */}
        <Route path="/" element={<HomePage />} />

        {/* Защищенные маршруты */}
        <Route
          path="/quests"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AllQuests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-quest"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddQuestPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Страница входа доступна всем */}
        <Route path="/auth" element={<AuthPage login={login} />} />

        {/* Страница квеста доступна всем */}
        <Route path="/quests/:id" element={<QuestPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
