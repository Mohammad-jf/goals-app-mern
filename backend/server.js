const express = require('express');

// it allow us to have .env file
const dotenv = require('dotenv').config();

const { errorHandler } = require('./middlewares/errorMiddleware');

const port = process.env.PORT || 5000;

// init express app
const app = express();

// for accessing data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/goals', require('./routes/goalsRoutes'));

//should be in bottom after everything to overWrite default express error handler)
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
