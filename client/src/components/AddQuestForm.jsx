import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const AddQuestForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSize, setTeamSize] = useState(2);
  const [duration, setDuration] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [ageLimit, setAgeLimit] = useState(14);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      teamSize,
      duration,
      difficulty,
      ageLimit,
      image,
    });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Добавить квест</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formTitle">
          <Form.Label column sm={2}>
            Название
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Введите название квеста"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDescription">
          <Form.Label column sm={2}>
            Описание
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Введите описание квеста"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formTeamSize">
          <Form.Label column sm={2}>
            Количество человек
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              required
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDuration">
          <Form.Label column sm={2}>
            Время (минуты)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Введите время квеста"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formDifficulty">
          <Form.Label column sm={2}>
            Сложность
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formAgeLimit">
          <Form.Label column sm={2}>
            Возраст
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Введите возрастное ограничение"
              value={ageLimit}
              onChange={(e) => setAgeLimit(Number(e.target.value))}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formImage">
          <Form.Label column sm={2}>
            Фотография
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Добавить квест
        </Button>
      </Form>
    </Container>
  );
};

export default AddQuestForm;
