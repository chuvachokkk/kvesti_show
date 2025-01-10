import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Toast,
  ToastContainer,
  Row,
  Col,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';

const AddQuestPage = ({ onQuestAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState(1);
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [ageLimit, setAgeLimit] = useState(14);
  const [rating, setRating] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверяем, что обязательные поля заполнены
    if (!title || !description) {
      setToastMessage('Название и описание квеста обязательны');
      setShowToast(true);
      return;
    }

    // Создаем объект с данными для отправки
    const questData = {
      title,
      description,
      teamSize: Number(teamSize),
      duration: Number(duration),
      difficulty: Number(difficulty),
      ageLimit: Number(ageLimit),
      rating: Number(rating),
    };

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.post('/quests', questData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setToastMessage('Квест успешно создан!');
        setShowToast(true);

        // Проверяем, что onQuestAdded является функцией, перед вызовом
        if (typeof onQuestAdded === 'function') {
          onQuestAdded();
        }

        setTimeout(() => navigate('/quests'), 2000); // Перенаправляем через 2 секунды
      }
    } catch (error) {
      console.error('Ошибка при создании квеста:', error);

      // Отображаем сообщение об ошибке от сервера
      if (error.response && error.response.data) {
        console.error('Данные ответа сервера:', error.response.data);
        setToastMessage(
          error.response.data.message || 'Ошибка при создании квеста'
        );
      } else {
        setToastMessage('Ошибка при создании квеста');
      }

      setShowToast(true);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Добавить квест</h2>
      <Form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
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
          <Row>
            {[1, 2, 3, 4, 5].map((size) => (
              <Col key={size}>
                <Button
                  variant={teamSize === size ? 'primary' : 'outline-primary'}
                  onClick={() => setTeamSize(size)}
                  className="w-100 mb-2"
                >
                  {size}
                </Button>
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDuration">
          <Form.Label>Время (минуты)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите время квеста"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficulty">
          <Form.Label>Сложность</Form.Label>
          <Row>
            {[1, 2, 3, 4, 5].map((level) => (
              <Col key={level}>
                <Button
                  variant={difficulty === level ? 'primary' : 'outline-primary'}
                  onClick={() => setDifficulty(level)}
                  className="w-100 mb-2"
                >
                  {level}
                </Button>
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAgeLimit">
          <Form.Label>Возрастное ограничение</Form.Label>
          <Form.Control
            type="number"
            placeholder="Введите возрастное ограничение"
            value={ageLimit}
            onChange={(e) => setAgeLimit(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRating">
          <Form.Label>Рейтинг</Form.Label>
          <StarRating rating={rating} setRating={setRating} />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Добавить квест
        </Button>
      </Form>

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
