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

  // Функция для обновления данных пользователя
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Передаём данные пользователя в Header */}
        <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
        <div className="flex-grow-1 pb-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
                  <ProfilePage user={user} updateUser={updateUser} />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage login={login} />} />
            <Route path="/quests/:id" element={<QuestPage />} />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
};

export default App;
