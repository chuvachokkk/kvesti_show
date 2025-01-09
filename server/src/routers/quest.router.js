const router = require('express').Router();
const { Quest } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

// Получить все квесты
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.findAll();
    res.json(quests);
  } catch (error) {
    console.error('Ошибка при получении квестов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить квесты пользователя
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const quests = await Quest.findAll({ where: { authorId: userId } });
    res.json(quests || []); // Возвращаем пустой массив, если квестов нет
  } catch (error) {
    console.error('Ошибка при получении квестов пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить квест по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const quest = await Quest.findByPk(id);

    if (!quest) {
      return res.status(404).json({ message: 'Квест не найден' });
    }

    res.json(quest);
  } catch (error) {
    console.error('Ошибка при получении квеста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новый квест
router.post('/', verifyAccessToken, async (req, res) => {
  const {
    title,
    description,
    teamSize,
    duration,
    difficulty,
    ageLimit,
    rating,
    image,
  } = req.body;
  const authorId = res.locals.user.id;

  // Проверяем обязательные поля
  if (!title) {
    return res
      .status(400)
      .json({ message: 'Название квеста обязательно', field: 'title' });
  }

  try {
    const quest = await Quest.create({
      title,
      description,
      teamSize,
      duration,
      difficulty,
      ageLimit,
      rating,
      image,
      authorId,
    });

    res.status(201).json(quest);
  } catch (error) {
    console.error('Ошибка при создании квеста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Обновить квест
router.put('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    teamSize,
    duration,
    difficulty,
    ageLimit,
    rating,
    image,
  } = req.body;
  const authorId = res.locals.user.id;

  try {
    const quest = await Quest.findOne({ where: { id, authorId } });

    if (!quest) {
      return res
        .status(404)
        .json({
          message: 'Квест не найден или у вас нет прав на его изменение',
        });
    }

    // Обновляем поля, если они переданы
    quest.title = title || quest.title;
    quest.description = description || quest.description;
    quest.teamSize = teamSize || quest.teamSize;
    quest.duration = duration || quest.duration;
    quest.difficulty = difficulty || quest.difficulty;
    quest.ageLimit = ageLimit || quest.ageLimit;
    quest.rating = rating || quest.rating;
    quest.image = image || quest.image;

    await quest.save();

    res.json(quest);
  } catch (error) {
    console.error('Ошибка при обновлении квеста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Удалить квест
router.delete('/:id', verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const authorId = res.locals.user.id;

  try {
    const quest = await Quest.findOne({ where: { id, authorId } });

    if (!quest) {
      return res
        .status(404)
        .json({
          message: 'Квест не найден или у вас нет прав на его удаление',
        });
    }

    await quest.destroy();

    res.sendStatus(204); // Успешное удаление, нет содержимого для ответа
  } catch (error) {
    console.error('Ошибка при удалении квеста:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
