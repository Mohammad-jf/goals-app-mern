const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// @desc authenticate user
// @route POST /api/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const user = await User.find(req.body.email);
  res.status(200).json(user);
});

// @desc create new user
// @route POST /api/users
// @access public
const signUp = asyncHandler(async (req, res) => {
  // check for all fields
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400);
    throw new Error('please fill all fields');
  }

  // check to see user exist or not
  const userExist = await User.findOne(req.body.email);
  if (userExist) {
    res.status(400);
    throw new Error('user already exist');
  }

  // hash the passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('invalid user data');
  }
});

// @desc get user data
// @route GET /api/users/me
// @access privete

const getUserData = asyncHandler(async () => {});

module.exports = { login, signUp, getUserData };
