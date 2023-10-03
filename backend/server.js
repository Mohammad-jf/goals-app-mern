const express = require('express');
const colors = require('colors');
const { connectDB } = require('./config/db');

// it allow us to have .env file
const dotenv = require('dotenv').config();

connectDB();

const { errorHandler } = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 8000;

// init express app
const app = express();

// for accessing data in req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'wellcome to the Goal setter api' });
});

// Routes
app.use('/api/goals', require('./routes/goalsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//should be in bottom after everything to overWrite default express error handler)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
