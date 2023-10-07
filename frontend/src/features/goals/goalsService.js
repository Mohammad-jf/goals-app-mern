import axios from 'axios';
const API_URL = '/api/goals';

const getGoals = async (token) => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createGoal = async (goalText,token) => {
  const response = await axios.post(API_URL, goalText);
  return response.data;
};

const goalsService = {
  getGoals,
  createGoal,
};

export default goalsService;
