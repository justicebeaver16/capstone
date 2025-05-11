const express = require('express');
const { ScheduleItem } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateScheduleItem = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Title is required'),
  check('startTime')
    .exists({ checkFalsy: true })
    .isISO8601()
    .withMessage('Valid start time is required'),
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  handleValidationErrors
];

// Get all schedule items for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const schedule = await ScheduleItem.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id },
      order: [['startTime', 'ASC']]
    });
    res.json({ Schedule: schedule });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch schedule', error: err.message });
  }
});

// Add a new schedule item
router.post('/', requireAuth, validateScheduleItem, async (req, res) => {
  const { title, startTime, endTime, description, eventId } = req.body;
  try {
    const item = await ScheduleItem.create({
      userId: req.user.id,
      eventId,
      title,
      startTime,
      endTime,
      description
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create schedule item', error: err.message });
  }
});

// Update a schedule item
router.put('/:itemId', requireAuth, validateScheduleItem, async (req, res) => {
  try {
    const item = await ScheduleItem.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Schedule item couldn't be found" });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update schedule item', error: err.message });
  }
});

// Delete a schedule item
router.delete('/:itemId', requireAuth, async (req, res) => {
  try {
    const item = await ScheduleItem.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Schedule item couldn't be found" });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await item.destroy();
    res.json({ message: 'Successfully deleted schedule item' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete schedule item', error: err.message });
  }
});

module.exports = router;