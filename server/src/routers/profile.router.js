const router = require('express').Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Обновление профиля
router.put('/update', verifyAccessToken, async (req, res) => {
  const { username, password } = req.body;
  const userId = res.locals.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const plainUser = user.get();
    delete plainUser.password;

    res.json({ user: plainUser });
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post(
  '/upload-image',
  verifyAccessToken,
  upload.single('file'),
  async (req, res) => {
    const userId = res.locals.user.id;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      user.avatar = req.file.path;
      await user.save();

      res.json({ imageUrl: req.file.path });
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  },
);

module.exports = router;
