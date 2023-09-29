const express = require('express');
const router = express.Router();
const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalsController');

// route for getting and creating goals
router.route('/').get(getGoals).post(createGoal);

// route for update or delete a goal base on id
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
