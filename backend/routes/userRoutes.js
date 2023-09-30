const express = require('express');
const router = express.Router();
const { login, signUp, getUserData } = require('../controllers/userController');

router.post('/', signUp);
router.post('/login', login);
router.get('/me', getUserData);
module.exports = router;
