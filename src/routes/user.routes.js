const express = require('express');
const {
  getCurrentUser,
  createUser,
  updateUser,
} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', getCurrentUser);
router.post('/', createUser);
router.put('/', updateUser);

module.exports = router;
