import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Carousel, Card, Button } from 'react-bootstrap';
import StarRating from '../components/StarRating';
import { FaArrowRight } from 'react-icons/fa';

const HomePage = () => {
  const featuredQuests = [
    {
      id: 1,
      title: 'Загадочный лес',
      description:
        'Погрузитесь в атмосферу таинственного леса, где вас ждут загадки и приключения.',
      image:
        'https://tumen.mir-kvestov.ru/uploads/quests/13103/original/adventura_zagadochnyi_les_photo1.jpg?1692193849',
      difficulty: 'Средняя',
      duration: '60 минут',
      players: '2-4 человека',
      rating: 3,
    },
    {
      id: 2,
      title: 'Побег из тюрьмы',
      description:
        'Спланируйте побег из тюрьмы, решая головоломки и взаимодействуя с другими игроками.',
      image:
        'https://mir-kvestov.ru/uploads/quests/346/large/chyo_za_kvest_pobeg_iz_azkabana_photo1.jpg?1702279362',
      difficulty: 'Высокая',
      duration: '90 минут',
      players: '3-6 человек',
      rating: 5,
    },
  ];

  return (
    <Container className="my-5">
      <h1
        className="text-center mb-4"
        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}
      >
        Добро пожаловать на сайт квестов!
      </h1>
      <p
        className="text-center mb-4"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Найдите свой идеальный квест и начните приключение!
      </p>

      <Carousel>
        {featuredQuests.map((quest) => (
          <Carousel.Item key={quest.id}>
            <img
              className="d-block w-100"
              src={quest.image}
              alt={quest.title}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            <Carousel.Caption
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 'bold',
                }}
              >
                {quest.title}
              </h3>
              <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                {quest.description}
              </p>
              <ul className="list-unstyled mb-3">
                <li>
                  <strong>Сложность:</strong> {quest.difficulty}
                </li>
                <li>
                  <strong>Время:</strong> {quest.duration}
                </li>
                <li>
                  <strong>Игроки:</strong> {quest.players}
                </li>
                <li>
                  <strong>Рейтинг:</strong>
                  <StarRating rating={quest.rating} isEditable={false} />
                </li>
              </ul>
              {/* <Link to={`/quests/${quest.id}`}>
                <Button
                  variant="primary"
                  style={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 'bold',
                  }}
                >
                  Подробнее <FaArrowRight style={{ marginLeft: '5px' }} />
                </Button>
              </Link> */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-center mb-5 mt-4">
        <Link to="/quests">
          <Button
            variant="outline-primary"
            className="me-2"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}
          >
            Все квесты
          </Button>
        </Link>
        <Link to="/add-quest">
          <Button
            variant="outline-success"
            style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}
          >
            Добавить квест
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
