const express = require('express');
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalsController');
const { protect } = require('../middlewares/authMiddleware');

// route for getting and creating goals
router.route('/').get(protect, getGoals).post(protect, createGoal);

// route for update or delete a goal base on id
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
