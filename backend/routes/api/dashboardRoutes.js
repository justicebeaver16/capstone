const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Event, Guest, Task, Photo } = require('../../db/models');

const router = express.Router();

// Get event overview for user's primary event
router.get('/event-overview', requireAuth, async (req, res) => {
  try {
    if (!req.user.primaryEventId) {
      return res.status(404).json({ message: 'No primary event assigned to your account.' });
    }

    const event = await Event.findByPk(req.user.primaryEventId);

    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found." });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load event overview.', error: err.message });
  }
});

// Get guest list preview
router.get('/guestlist-preview', requireAuth, async (req, res) => {
  try {
    const guests = await Guest.findAll({
      where: { EventId: req.user.primaryEventId },
      limit: 5
    });

    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load guest list.', error: err.message });
  }
});

// Get tasks preview
router.get('/tasks-preview', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { EventId: req.user.primaryEventId },
      order: [['createdAt', 'ASC']],
      limit: 3
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load tasks.', error: err.message });
  }
});

// Get photo album preview
router.get('/photos-preview', requireAuth, async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: { EventId: req.user.primaryEventId },
      limit: 3
    });

    res.json(photos);
  } catch (err) {
    console.error('Photos preview error:', err);
    res.status(500).json({ message: 'Failed to load photo album', error: err.message });
  }
});

module.exports = router;