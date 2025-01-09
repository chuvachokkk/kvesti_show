import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const CommentsSection = ({ questId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/comments/${questId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [questId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/comments', {
        text: newComment,
        questId,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Комментарии</Card.Title>
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>
              <strong>{comment.User.username}:</strong> {comment.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group controlId="formComment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Оставьте комментарий"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            Отправить
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentsSection;
