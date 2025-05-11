const express = require('express');
const { MoodboardItem } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateMoodboardItem = [
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Image URL is required'),
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  handleValidationErrors
];

// Get all moodboard items for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const items = await MoodboardItem.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id }
    });
    res.json({ Moodboard: items });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch moodboard items', error: err.message });
  }
});

// Add a new moodboard item
router.post('/', requireAuth, validateMoodboardItem, async (req, res) => {
  const { imageUrl, eventId, note } = req.body;
  try {
    const item = await MoodboardItem.create({
      userId: req.user.id,
      eventId,
      imageUrl,
      note
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add moodboard item', error: err.message });
  }
});

// Delete a moodboard item
router.delete('/:itemId', requireAuth, async (req, res) => {
  try {
    const item = await MoodboardItem.findByPk(req.params.itemId);

    if (!item) return res.status(404).json({ message: "Moodboard item couldn't be found" });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await item.destroy();
    res.json({ message: 'Successfully deleted moodboard item' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete moodboard item', error: err.message });
  }
});

module.exports = router;