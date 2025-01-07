import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AllQuests from './pages/AllQuests';
import QuestPage from './pages/QuestPage';
import AuthPage from './pages/AuthPage';
import AddQuestPage from './pages/AddQuestPage';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quests" element={<AllQuests />} />
        <Route path="/quests/:id" element={<QuestPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/add-quest" element={<AddQuestPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
