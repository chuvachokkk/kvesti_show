import React, { useContext, useState } from 'react';
import { AuthContext } from '../utils/AuthContext';
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

const ProfilePage = () => {
  const { user, login } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [userQuests, setUserQuests] = useState([]); // Список квестов, добавленных пользователем
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Загрузка квестов пользователя при загрузке страницы
  React.useEffect(() => {
    if (user) {
      fetchUserQuests();
    }
  }, [user]);

  const fetchUserQuests = async () => {
    try {
      const response = await axiosInstance.get(`/quests/user/${user.id}`);
      setUserQuests(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке квестов:', error);
      setError('Ошибка при загрузке квестов.');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/user/update', {
        username,
        password,
        profileImage,
      });
      login(response.data); // Обновляем данные пользователя в контексте
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
        const response = await axiosInstance.post(
          '/user/upload-image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
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
                src={profileImage || 'https://via.placeholder.com/150'}
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
