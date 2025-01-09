import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Card,
  Alert,
} from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';

const ProfilePage = ({ user, updateUser }) => {
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(user?.avatar || '');
  const [userQuests, setUserQuests] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchUserQuests = async () => {
    try {
      const response = await axiosInstance.get(`/quests/user/${user.id}`);
      setUserQuests(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке квестов:', error);
      setError('Ошибка при загрузке квестов.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserQuests();
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.put(
        '/profile/update',
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Обновляем данные пользователя
      const updatedUser = { ...user, username };
      updateUser(updatedUser);

      setMessage('Профиль успешно обновлен!');
      setError('');
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setError('Ошибка при обновлении профиля.');
      setMessage('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axiosInstance.post(
          '/profile/upload-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Обновляем данные пользователя
        const updatedUser = { ...user, avatar: response.data.imageUrl };
        updateUser(updatedUser);

        setProfileImage(response.data.imageUrl);
        setMessage('Фото профиля успешно обновлено!');
        setError('');
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
        setError('Ошибка при загрузке изображения.');
        setMessage('');
      }
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Личный кабинет</h1>
      {user ? (
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center p-3">
              <Image
                src={profileImage || 'data:image/jpeg;base64,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'}
                roundedCircle
                fluid
                className="mb-3"
                style={{ width: '150px', height: '150px', margin: '0 auto' }}
              />
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Загрузить фото профиля</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
              </Form.Group>
              <Card.Text>
                <strong>Имя пользователя:</strong> {username}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email}
              </Card.Text>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="p-4">
              <h3 className="mb-4">Редактирование профиля</h3>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdateProfile}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Новый пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите новый пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Обновить профиль
                </Button>
              </Form>
            </Card>

            <Card className="mt-4 p-4">
              <h3 className="mb-4">Добавленные квесты</h3>
              {userQuests.length > 0 ? (
                <Row>
                  {userQuests.map((quest) => (
                    <Col key={quest.id} md={6} className="mb-4">
                      <Card>
                        <Card.Img
                          variant="top"
                          src={quest.image}
                          alt={quest.title}
                        />
                        <Card.Body>
                          <Card.Title>{quest.title}</Card.Title>
                          <Card.Text>{quest.description}</Card.Text>
                          <Button
                            variant="outline-primary"
                            href={`/quests/${quest.id}`}
                          >
                            Подробнее
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-center">
                  Вы еще не добавили ни одного квеста.
                </p>
              )}
            </Card>
          </Col>
        </Row>
      ) : (
        <Alert variant="warning" className="text-center">
          Пожалуйста, войдите в систему.
        </Alert>
      )}
    </Container>
  );
};

export default ProfilePage;
