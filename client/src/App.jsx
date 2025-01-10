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
import EditQuestPage from './pages/EditQuestPage'; // Импортируем новую страницу

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('accessToken', userData.accessToken);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('accessToken');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
        <div className="flex-grow-1 pb-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/quests"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AllQuests user={user} />
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
            <Route
              path="/quests/:id/edit"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditQuestPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer className="mt-auto" />
      </div>
    </Router>
  );
};

export default App;
