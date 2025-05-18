const express = require('express');
const { Guest } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware
const validateGuest = [
  check('primaryName')
    .exists({ checkFalsy: true })
    .withMessage('Guest name is required'),
  check('primaryEmail')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('A valid email is required'),
  handleValidationErrors
];

// GET /api/guestlist — All guests for current user's primary event
router.get('/', requireAuth, async (req, res) => {
  try {
    const primaryEventId = req.user.primaryEventId;

    if (!primaryEventId) {
      return res.status(400).json({ error: 'User does not have a primary event assigned.' });
    }

    const guests = await Guest.findAll({
      where: { EventId: primaryEventId }
    });

    res.json(guests);
  } catch (err) {
    console.error('Error in GET /api/guestlist:', err);
    res.status(500).json({ error: 'Failed to load guests.' });
  }
});

// POST /api/guestlist — Create a new guest
router.post('/', requireAuth, validateGuest, async (req, res) => {
  try {
    const primaryEventId = req.user.primaryEventId;
    const {
      primaryName,
      primaryEmail,
      otherGuests,
      numberInParty,
      relation,
      rsvpStatus,
      rsvpDate,
      actualAttendees,
      slowDanceSong,
      danceSong,
      sentReminder,
      reminderDate,
      qrCode,
      notes // if you're using this somewhere
    } = req.body;

    if (!primaryEventId) {
      return res.status(400).json({ error: 'User does not have a primary event assigned.' });
    }

    const newGuest = await Guest.create({
      primaryName,
      primaryEmail,
      otherGuests,
      numberInParty,
      relation,
      rsvpStatus,
      rsvpDate,
      actualAttendees,
      slowDanceSong,
      danceSong,
      sentReminder,
      reminderDate,
      qrCode,
      EventId: primaryEventId
    });

    res.status(201).json(newGuest);
  } catch (err) {
    console.error('Error in POST /api/guestlist:', err);
    res.status(500).json({ error: 'Failed to add guest.' });
  }
});

module.exports = router;

// const express = require('express');
// const { Guest } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// // Validation middleware
// const validateGuest = [
//   check('name')
//     .exists({ checkFalsy: true })
//     .withMessage('Guest name is required'),
//   check('email')
//     .optional()
//     .isEmail()
//     .withMessage('Email must be valid'),
//   handleValidationErrors
// ];

// // GET /api/guestlist — All guests for current user's primary event
// router.get('/', requireAuth, async (req, res) => {
//   try {
//     const primaryEventId = req.user.primaryEventId;

//     if (!primaryEventId) {
//       return res.status(400).json({ error: 'User does not have a primary event assigned.' });
//     }

//     const guests = await Guest.findAll({
//       where: {
//         EventId: primaryEventId,
//         userId: req.user.id
//       }
//     });

//     res.json(guests);
//   } catch (err) {
//     console.error('Error in GET /api/guestlist:', err);
//     res.status(500).json({ error: 'Failed to load guests.' });
//   }
// });

// // POST /api/guestlist — Create a new guest
// router.post('/', requireAuth, validateGuest, async (req, res) => {
//   try {
//     const primaryEventId = req.user.primaryEventId;
//     const { name, email, rsvpStatus, dietaryRestrictions, notes } = req.body;

//     if (!primaryEventId) {
//       return res.status(400).json({ error: 'User does not have a primary event assigned.' });
//     }

//     const newGuest = await Guest.create({
//       userId: req.user.id,
//       EventId: primaryEventId,
//       primaryName: name,
//       primaryEmail: email,
//       rsvpStatus,
//       dietaryRestrictions,
//       notes
//     });

//     res.status(201).json(newGuest);
//   } catch (err) {
//     console.error('Error in POST /api/guestlist:', err);
//     res.status(500).json({ error: 'Failed to add guest.' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const { Guest } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const router = express.Router();

// const validateGuest = [
//   check('name')
//     .exists({ checkFalsy: true })
//     .withMessage('Guest name is required'),
//   check('email')
//     .optional()
//     .isEmail()
//     .withMessage('Email must be valid'),
//   check('eventId')
//     .isInt()
//     .withMessage('Valid event ID is required'),
//   handleValidationErrors
// ];

// // Get all guests for an event
// router.get('/:eventId', requireAuth, async (req, res) => {
//   try {
//     const guests = await Guest.findAll({
//       where: { eventId: req.params.eventId, userId: req.user.id }
//     });
//     res.json({ Guests: guests });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch guest list', error: err.message });
//   }
// });

// // Add a new guest
// router.post('/', requireAuth, validateGuest, async (req, res) => {
//   const { name, email, rsvpStatus, dietaryRestrictions, notes, eventId } = req.body;
//   try {
//     const guest = await Guest.create({
//       userId: req.user.id,
//       eventId,
//       name,
//       email,
//       rsvpStatus,
//       dietaryRestrictions,
//       notes
//     });
//     res.status(201).json(guest);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to add guest', error: err.message });
//   }
// });

// // Update a guest
// router.put('/:guestId', requireAuth, validateGuest, async (req, res) => {
//   try {
//     const guest = await Guest.findByPk(req.params.guestId);
//     if (!guest) return res.status(404).json({ message: "Guest couldn't be found" });
//     if (guest.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

//     await guest.update(req.body);
//     res.json(guest);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to update guest', error: err.message });
//   }
// });

// // Delete a guest
// router.delete('/:guestId', requireAuth, async (req, res) => {
//   try {
//     const guest = await Guest.findByPk(req.params.guestId);
//     if (!guest) return res.status(404).json({ message: "Guest couldn't be found" });
//     if (guest.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

//     await guest.destroy();
//     res.json({ message: 'Successfully deleted guest' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete guest', error: err.message });
//   }
// });

// module.exports = router;