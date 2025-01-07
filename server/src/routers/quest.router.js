const router = require('express').Router();
const { Quest } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

router.get('/', async (req, res) => {
  try {
    const quest = await Quest.findAll();
    res.json(quest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ошибка' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quest = await Quest.findOne({ where: { id } });
    if (!quest) {
      return res.status(404).json({ message: 'такого квеста нету' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ошибка' });
  }
});

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
  const authorId = req.user.id; // ID пользователя из токена

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
    res.status(500).json({ message: 'не получилось создать =(' });
  }
});
