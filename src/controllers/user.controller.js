const User = require('../models/user.model');

/**
 * GET /api/user/me
 * Получить профиль текущего пользователя
 */
const getCurrentUser = async (req, res) => {
  try {
    console.log('[GET /users/me] req.uid =', req.uid);

    const user = await User.findOne({ accountId: req.uid });

    if (!user) {
      console.log('[GET /users/me] User not found for accountId =', req.uid);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('[GET /users/me] Found user:', user);

    return res.status(200).json(user);
  } catch (err) {
    console.error('[GET /users/me] Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/user
 * Создать пользователя
 */
const createUser = async (req, res) => {
  try {
    const { name, surname, avatarUrl, bio } = req.body;

    const existing = await User.findOne({ accountId: req.uid });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      accountId: req.uid,
      name,
      surname,
      avatarUrl,
      bio,
      createdAt: new Date(),
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * PUT /api/user
 * Обновить профиль текущего пользователя
 */
const updateUser = async (req, res) => {
  try {
    const { name, surname, avatarUrl, bio } = req.body;

    const user = await User.findOneAndUpdate(
      { accountId: req.uid },
      { name, surname, avatarUrl, bio },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('updateUser error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
};
