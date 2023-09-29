const getGoals = (req, res) => {
  res.status(200).json({ message: 'get Goals' });
};

const createGoal = (req, res) => {
  res.status(201).json({ message: 'goal created' });
};

const updateGoal = (req, res) => {
  res.status(200).json({ message: `goal ${req.params.id} updated` });
};

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `goal ${req.params.id} deleted` });
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
