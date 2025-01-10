import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const AllQuests = ({ user }) => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuests = async () => {
    try {
      const response = await axiosInstance.get('/quests');
      setQuests(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке квестов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Все квесты</h1>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {quests.map((quest) => {
            const isAuthor = user && quest.authorId === user.id; // Проверка, является ли пользователь автором квеста
            return (
              <Col key={quest.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={
                      quest.image
                        ? `http://localhost:3000${quest.image}`
                        : 'https://via.placeholder.com/300'
                    }
                  />
                  <Card.Body>
                    <Card.Title>{quest.title}</Card.Title>
                    <Card.Text>{quest.description}</Card.Text>
                    <Card.Text>
                      <strong>Количество человек:</strong> {quest.teamSize}
                    </Card.Text>
                    <Card.Text>
                      <strong>Время:</strong> {quest.duration} минут
                    </Card.Text>
                    <Card.Text>
                      <strong>Сложность:</strong> {quest.difficulty}/5
                    </Card.Text>
                    <Card.Text>
                      <strong>Возрастное ограничение:</strong> {quest.ageLimit}+
                    </Card.Text>
                    <Link to={`/quests/${quest.id}`}>
                      <Button variant="primary" className="w-100 mb-2">
                        Подробнее
                      </Button>
                    </Link>
                    {isAuthor && ( // Отображаем кнопку "Редактировать" только для автора
                      <Link to={`/quests/${quest.id}/edit`}>
                        <Button variant="secondary" className="w-100">
                          Редактировать
                        </Button>
                      </Link>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default AllQuests;
