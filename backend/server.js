const express = require('express');
const { connectDB } = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');
const colors = require('colors');

// it allow us to have .env file
const dotenv = require('dotenv').config();

connectDB();


const PORT = process.env.PORT || 8000;

// init express app
const app = express();

// for accessing data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/goals', require('./routes/goalsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//should be in bottom after everything to overWrite default express error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
