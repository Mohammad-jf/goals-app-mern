const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc get goals
// @route GET /api/goals
// @access privete
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc create new goal
// @route POST /api/goals
// @access privete
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // bad request
    res.status(400);
    throw new Error('please add a text');
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(goal);
});

// @desc update specific goal
// @route PUT /api/goals/:id
// @access privete
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // make sure the loggedin user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc delete specific goal
// @route DELETE /api/goals/:id
// @access privete
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // make sure the loggedin user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
