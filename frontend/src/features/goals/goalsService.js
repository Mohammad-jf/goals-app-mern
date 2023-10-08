import axios from 'axios';
const API_URL_goals = '/api/goals';

const getGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_goals, config);
  return response.data;
};

const createGoal = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL_goals, { text }, config);
  return response.data;
};

const goalsService = {
  getGoals,
  createGoal,
};

export default goalsService;
