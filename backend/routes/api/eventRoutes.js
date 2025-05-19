const express = require('express');
const { Event, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware for event
const validateEvent = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Event title is required'),
  check('date')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Valid event date is required'),
  handleValidationErrors
];

// Create a new event
router.post('/', requireAuth, validateEvent, async (req, res) => {
  const { title, date, description, address, city, state, zipCode, eventType, status } = req.body;

  try {
    const event = await Event.create({
      title,
      date,
      description,
      address,
      city,
      state,
      zipCode,
      eventType,
      status,
      UserId: req.user.id
    });

    if (!req.user.primaryEventId) {
      await req.user.update({ primaryEventId: event.id });
    }

    res.status(201).json(event);
  } catch (err) {
    console.error('Event creation error:', err);
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
});

// Get current user's events
router.get('/current', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const events = await Event.findAll({
      where: {
        UserId: userId
      },
      order: [['date', 'ASC']]
    });

    res.json({ Events: events });
  } catch (err) {
    console.error('Failed to fetch events:', err);
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});
// router.get('/current', requireAuth, async (req, res) => {
//   try {
//     const events = await Event.findAll({
//       where: { UserId: req.user.id },
//       order: [['date', 'ASC']]
//     });
//     res.json({ Events: events });
//   } catch (err) {
//     console.error('Failed to fetch current user events:', err);
//     res.status(500).json({ message: 'Failed to fetch events', error: err.message });
//   }
// });

// Get event by ID
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) return res.status(404).json({ message: "Event couldn't be found" });
    if (event.UserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving event', error: err.message });
  }
});

// Update event
router.put('/:id', requireAuth, validateEvent, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) return res.status(404).json({ message: "Event couldn't be found" });
    if (event.UserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const {
      title,
      date,
      description,
      address,
      city,
      state,
      zipCode,
      eventType,
      status
    } = req.body;

    await event.update({
      title,
      date,
      description,
      address,
      city,
      state,
      zipCode,
      eventType,
      status
    });

    res.json(event);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
});

// Delete event
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) return res.status(404).json({ message: "Event couldn't be found" });
    if (event.UserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await event.destroy();
    res.json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
});

module.exports = router;