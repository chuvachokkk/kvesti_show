const router = require('express').Router();
const { Comment, User } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

// Добавление комментария
router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { text, questId } = req.body;
    const userId = res.locals.user.id;

    const comment = await Comment.create({ text, userId, questId });

    // Включаем данные пользователя в ответ
    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    res.status(201).json(commentWithUser);
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
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']], // Сортировка по дате создания
    });

    // Преобразование даты в строковый формат
    const commentsWithDate = comments.map((comment) => ({
      ...comment.toJSON(),
      createdAt: comment.createdAt.toLocaleString(), // Форматируем дату
    }));

    res.json(commentsWithDate);
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удаление комментария (опционально)
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
