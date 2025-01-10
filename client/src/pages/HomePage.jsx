import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import QuestList from '../components/QuestList';

const HomePage = ({ user }) => {
  const featuredQuests = [
    {
      id: 1,
      title: 'Квест 1',
      description: 'Описание квеста 1',
      image: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      title: 'Квест 2',
      description: 'Описание квеста 2',
      image: 'https://via.placeholder.com/300',
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Добро пожаловать на сайт квестов!</h1>
      <p className="text-center mb-4">
        Найдите свой идеальный квест и начните приключение!
      </p>

      <Row className="mb-4">
        {featuredQuests.map((quest) => (
          <Col key={quest.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={quest.image} />
              <Card.Body>
                <Card.Title>{quest.title}</Card.Title>
                <Card.Text>{quest.description}</Card.Text>
                <Link to={`/quests/${quest.id}`}>
                  <Button variant="primary" className="w-100">
                    Подробнее
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center">
        <Link to="/quests">
          <Button variant="outline-primary" className="me-2">
            Все квесты
          </Button>
        </Link>
        <Link to="/add-quest">
          <Button variant="outline-success">Добавить квест</Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
