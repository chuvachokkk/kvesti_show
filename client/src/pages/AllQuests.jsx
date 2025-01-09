import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const AllQuests = () => {
  const [quests, setQuests] = useState([]);

  const fetchQuests = async () => {
    try {
      const response = await axiosInstance.get('/quests');
      setQuests(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке квестов:', error);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
    <Container>
      <h1 className="text-center my-4">Все квесты</h1>
      <Row>
        {quests.map((quest) => (
          <Col key={quest.id} md={4} className="mb-4">
            <Card>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllQuests;
