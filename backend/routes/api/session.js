const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware for login
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];

// Login route
router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      email: credential,
    },
  });

  if (!user) {
    console.log('No user found for:', credential);
  } else {
    console.log('User found:', user.email);
    console.log('Stored hash:', user.password);
    console.log('Compare result:', bcrypt.compareSync(password, user.password));
  }

  if (!user || !bcrypt.compareSync(password, user.password)) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = { credential: 'The provided credentials were invalid.' };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    planningPermissions: user.planningPermissions,
    primaryEventId: user.primaryEventId,
  };

  await setTokenCookie(res, safeUser);

  return res.json({ user: safeUser });
});
// router.post('/', validateLogin, async (req, res, next) => {
//   const { credential, password } = req.body;

//   const user = await User.unscoped().findOne({
//     where: {
//       email: credential,
//     },
//   });

//   if (!user || !bcrypt.compareSync(password, user.password)) {
//     const err = new Error('Login failed');
//     err.status = 401;
//     err.title = 'Login failed';
//     err.errors = { credential: 'The provided credentials were invalid.' };
//     return next(err);
//   }

//   const safeUser = {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     role: user.role,
//     planningPermissions: user.planningPermissions,
//     primaryEventId: user.primaryEventId,
//   };

//   await setTokenCookie(res, safeUser);

//   return res.json({ user: safeUser });
// });

// Logout route
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// Restore user session route
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      planningPermissions: user.planningPermissions,
      primaryEventId: user.primaryEventId,
    };
    return res.json({ user: safeUser });
  } else {
    return res.json({ user: null });
  }
});

module.exports = router;