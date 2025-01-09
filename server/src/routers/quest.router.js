const router = require('express').Router();
const { Quest } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

// Получить все квесты
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.findAll();
    res.json(quests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить квест по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quest = await Quest.findOne({ where: { id } });
    if (!quest) {
      return res.status(404).json({ message: 'Квест не найден' });
    }
    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить квесты пользователя
router.get('/user/:userId', verifyAccessToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const quests = await Quest.findAll({ where: { authorId: userId } });

    if (!quests || quests.length === 0) {
      return res.status(404).json({ message: 'Квесты не найдены' });
    }

    res.json(quests);
  } catch (error) {
    console.error('Ошибка при получении квестов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создать новый квест
router.post('/', verifyAccessToken, async (req, res) => {
  const {
    title,
    description,
    latitude,
    longitude,
    teamSize,
    duration,
    difficulty,
    fearLevel,
    ageLimit,
    puzzlesCount,
    features,
  } = req.body;
  const authorId = res.locals.user.id;

  try {
    const quest = await Quest.create({
      title,
      description,
      latitude,
      longitude,
      teamSize,
      duration,
      difficulty,
      fearLevel,
      ageLimit,
      puzzlesCount,
      features,
      authorId,
    });

    res.status(201).json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при создании квеста' });
  }
});

module.exports = router;
