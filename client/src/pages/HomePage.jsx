import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import StarRating from '../components/StarRating'; // Импортируем компонент StarRating

const HomePage = () => {
  const featuredQuests = [
    {
      id: 1,
      title: 'Загадочный лес',
      description: 'Погрузитесь в атмосферу таинственного леса, где вас ждут загадки и приключения.',
      image: 'https://tumen.mir-kvestov.ru/uploads/quests/13103/original/adventura_zagadochnyi_les_photo1.jpg?1692193849',
      difficulty: 'Средняя',
      duration: '60 минут',
      players: '2-4 человека',
      rating: 3, // Рейтинг квеста
    },
    {
      id: 2,
      title: 'Побег из тюрьмы',
      description: 'Спланируйте побег из тюрьмы, решая головоломки и взаимодействуя с другими игроками.',
      image: 'https://mir-kvestov.ru/uploads/quests/346/large/chyo_za_kvest_pobeg_iz_azkabana_photo1.jpg?1702279362',
      difficulty: 'Высокая',
      duration: '90 минут',
      players: '3-6 человек',
      rating: 5, // Рейтинг квеста
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Добро пожаловать на сайт квестов!</h1>
      <p className="text-center mb-4">
        Найдите свой идеальный квест и начните приключение!
      </p>

      {/* Секция с квестами */}
      <Row className="mb-4">
        {featuredQuests.map((quest) => (
          <Col key={quest.id} md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={quest.image} alt={quest.title} />
              <Card.Body>
                <Card.Title>{quest.title}</Card.Title>
                <Card.Text>{quest.description}</Card.Text>
                <ul className="list-unstyled mb-3">
                  <li><strong>Сложность:</strong> {quest.difficulty}</li>
                  <li><strong>Время:</strong> {quest.duration}</li>
                  <li><strong>Игроки:</strong> {quest.players}</li>
                  <li>
                    <strong>Рейтинг:</strong>
                    <StarRating rating={quest.rating} isEditable={false} /> {/* Отображаем рейтинг */}
                  </li>
                </ul>
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

      {/* Кнопки для перехода к квестам */}
      <div className="text-center mb-5">
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