import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddQuestPage = ({ onQuestAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState(2);
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [ageLimit, setAgeLimit] = useState(14);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem('accessToken'); // Получаем токен
      const response = await axiosInstance.post(
        '/quests',
        {
          title,
          description,
          teamSize,
          duration,
          difficulty,
          ageLimit,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Добавляем токен в заголовок
          },
        }
      );

      if (response.status === 201) {
        setToastMessage('Квест успешно создан!');
        setShowToast(true);
        onQuestAdded();
        setTimeout(() => navigate('/quests'), 2000); // Перенаправляем через 2 секунды
      }
    } catch (error) {
      console.error('Ошибка при создании квеста:', error);
      setToastMessage('Ошибка при создании квеста');
      setShowToast(true);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Добавить квест</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите название квеста"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Введите описание квеста"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTeamSize">
          <Form.Label>Количество человек</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите количество человек"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDuration">
          <Form.Label>Время (минуты)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите время квеста"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label>Сложность</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите сложность (1-5)"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAgeLimit">
          <Form.Label>Возрастное ограничение</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите возрастное ограничение"
            value={ageLimit}
            onChange={(e) => setAgeLimit(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Добавить квест
        </Button>
      </Form>

      {/* Toast для уведомлений */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Уведомление</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AddQuestPage;
