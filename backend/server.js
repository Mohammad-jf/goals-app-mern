const express = require('express');
// it allow us to have .env file
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

// init express app
const app = express();

app.use('/api/goals', require('./routes/goalsRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
