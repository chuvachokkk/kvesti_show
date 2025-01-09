// routes/comments.router.js
const express = require('express');
const router = express.Router();
const { Comment } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

// Добавление комментария
router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { text, questId } = req.body;
    const userId = res.locals.user.id;

    const comment = await Comment.create({ text, userId, questId });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получение комментариев для квеста
router.get('/:questId', async (req, res) => {
  try {
    const { questId } = req.params;

    const comments = await Comment.findAll({
      where: { questId },
      include: [{ model: User, attributes: ['username'] }], // Включаем информацию о пользователе
    });

    res.json(comments);
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаление комментария
router.delete('/:id', verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;

    const comment = await Comment.findOne({ where: { id, userId } });

    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }

    await comment.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
