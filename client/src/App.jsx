import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext'; // Импортируем AuthProvider
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllQuests from './pages/AllQuests';
import QuestPage from './pages/QuestPage';
import AuthPage from './pages/AuthPage';
import AddQuestPage from './pages/AddQuestPage';
import ProfilePage from './pages/ProfilePage'; // Добавляем страницу личного кабинета

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quests" element={<AllQuests />} />
          <Route path="/quests/:id" element={<QuestPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/add-quest" element={<AddQuestPage />} />
          <Route path="/profile" element={<ProfilePage />} />{' '}
          {/* Страница личного кабинета */}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
