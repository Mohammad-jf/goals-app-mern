const express = require('express');
const router = express.Router();
const { login, signUp, getUserData } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', signUp);
router.post('/login', login);
router.get('/me', protect, getUserData);
module.exports = router;
