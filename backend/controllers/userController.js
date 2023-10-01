const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc create new user
// @route POST /api/users
// @access public
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check for all fields
  if (!email || !name || !password) {
    res.status(400);
    throw new Error('please fill all fields');
  }

  // check to see user exist or not
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  // hash the passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

// @desc authenticate user
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });

  // check for password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credential');
  }
});

// @desc get user data
// @route GET /api/users/me
// @access privete
const getUserData = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

// generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { login, signUp, getUserData };
