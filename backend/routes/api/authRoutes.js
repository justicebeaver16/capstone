const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCredentials = [
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('password').notEmpty().withMessage('Password is required.'),
  handleValidationErrors
];

router.post('/login', validateCredentials, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Logged in successfully', user });
});

router.post('/register', validateCredentials, async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, hashedPassword });
  res.status(201).json(user);
});

router.post('/logout', requireAuth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;