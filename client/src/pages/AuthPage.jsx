import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Container } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AuthPage = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = activeTab === 'login' ? '/auth/signin' : '/auth/signup';
    const data =
      activeTab === 'login'
        ? { email: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

    try {
      const response = await axiosInstance.post(endpoint, data);
      const { accessToken, user } = response.data;

      login({ ...user, accessToken });
      navigate('/');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <h1 className="text-center">
          {activeTab === 'login' ? 'Вход' : 'Регистрация'}
        </h1>
        <Tabs
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-3"
        >
          <Tab eventKey="login" title="Вход">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Войти
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="register" title="Регистрация">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Введите имя пользователя"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Зарегистрироваться
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default AuthPage;
