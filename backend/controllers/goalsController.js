const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

// @desc get goals
// @route GET /api/goals
// @access privete
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
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
    text: req.body.text,
  });

  res.status(201).json(goal);
});

// @desc update specific goal
// @route PUT /api/goals/:id
// @access privete
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `goal ${req.params.id} updated` });
});

// @desc delete specific goal
// @route DELETE /api/goals/:id
// @access privete
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `goal ${req.params.id} updated` });
});

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
