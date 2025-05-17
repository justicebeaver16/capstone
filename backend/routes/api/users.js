const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User, Event } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { email, password, firstName, lastName, eventId } = req.body;

  try {
    let primaryEventId = null;

    if (eventId) {
      const requestedEvent = await Event.findByPk(eventId);
      if (requestedEvent) {
        primaryEventId = requestedEvent.id;
      } else {
        return res.status(400).json({ error: 'Invalid event ID provided.' });
      }
    } else {
      // fallback: assign default event if needed
      const defaultEvent = await Event.findOne({ where: { title: 'Miller-Johnson Wedding Ceremony' } });
      if (defaultEvent) primaryEventId = defaultEvent.id;
    }

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      password,
      primaryEventId
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      planningPermissions: user.planningPermissions,
      primaryEventId: user.primaryEventId
    };

    await setTokenCookie(res, safeUser);

    return res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

module.exports = router;