const express = require('express');
const { Event } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateEvent = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Event name is required'),
  check('date')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Valid event date is required'),
  handleValidationErrors
];

// Create an event
router.post('/', requireAuth, validateEvent, async (req, res) => {
  const { name, date, description, location } = req.body;
  try {
    const event = await Event.create({
      userId: req.user.id,
      name,
      date,
      description,
      location
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
});

// Get all events for current user
router.get('/current', requireAuth, async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { userId: req.user.id }
    });

    res.json({ Events: events });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

// Get event by ID
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) return res.status(404).json({ message: "Event couldn't be found" });
    if (event.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

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
    if (event.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
});

// Delete event
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) return res.status(404).json({ message: "Event couldn't be found" });
    if (event.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await event.destroy();
    res.json({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
});

module.exports = router;