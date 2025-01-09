const router = require('express').Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../middleware/verifyToken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Файлы будут сохраняться в папку uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
  },
});

const upload = multer({ storage: storage });

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

      // Сохраняем путь к изображению в базе данных
      const imageUrl = `/uploads/${req.file.filename}`; // Используем только имя файла
      user.avatar = imageUrl;
      await user.save();

      res.json({ imageUrl }); // Возвращаем полный URL к изображению
    } catch (error) {
      console.error('Ошибка при загрузке изображения:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
);

module.exports = router;