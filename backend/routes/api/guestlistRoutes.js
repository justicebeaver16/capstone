const express = require('express');
const { Guest } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateGuest = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Guest name is required'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Email must be valid'),
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  handleValidationErrors
];

// Get all guests for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const guests = await Guest.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id }
    });
    res.json({ Guests: guests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch guest list', error: err.message });
  }
});

// Add a new guest
router.post('/', requireAuth, validateGuest, async (req, res) => {
  const { name, email, rsvpStatus, dietaryRestrictions, notes, eventId } = req.body;
  try {
    const guest = await Guest.create({
      userId: req.user.id,
      eventId,
      name,
      email,
      rsvpStatus,
      dietaryRestrictions,
      notes
    });
    res.status(201).json(guest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add guest', error: err.message });
  }
});

// Update a guest
router.put('/:guestId', requireAuth, validateGuest, async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.guestId);
    if (!guest) return res.status(404).json({ message: "Guest couldn't be found" });
    if (guest.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await guest.update(req.body);
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update guest', error: err.message });
  }
});

// Delete a guest
router.delete('/:guestId', requireAuth, async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.guestId);
    if (!guest) return res.status(404).json({ message: "Guest couldn't be found" });
    if (guest.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await guest.destroy();
    res.json({ message: 'Successfully deleted guest' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete guest', error: err.message });
  }
});

module.exports = router;