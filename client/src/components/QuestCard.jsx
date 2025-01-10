import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import StarRating from './StarRating';

const QuestCard = ({ quest, user }) => {
  const isAuthor = user && quest.authorId === user.id;

  return (
    <Card className="mb-4 shadow-sm" style={{ height: '100%' }}>
      <Card.Img
        variant="top"
        src={
          quest.image
            ? `http://localhost:3000${quest.image}`
            : 'https://via.placeholder.com/300'
        }
        alt={quest.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
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
          <strong>Рейтинг:</strong> <StarRating rating={quest.rating} />
        </Card.Text>
        <Card.Text>
          <strong>Возрастное ограничение:</strong> {quest.ageLimit}+
        </Card.Text>
        <Link to={`/quests/${quest.id}`} className="mt-auto">
          <Button variant="primary" className="w-100 mb-2">
            Подробнее
          </Button>
        </Link>
        {isAuthor && (
          <Link to={`/quests/${quest.id}/edit`} className="mt-auto">
            <Button variant="secondary" className="w-100">
              Редактировать
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuestCard;
