const express = require('express');
const { requireAuth } = require('../../utils/auth');
const {
  Event,
  Guest,
  Task,
  Photo,
  User,
  EventParty,
  Member,
  Vendor,
  MoodBoard,
  Table,
  Seat
} = require('../../db/models');

const router = express.Router();

// Get event overview for user's primary event
router.get('/event-overview', requireAuth, async (req, res) => {
  try {
    if (!req.user.primaryEventId) {
      return res.status(404).json({ message: 'No primary event assigned to your account.' });
    }

    const event = await Event.findByPk(req.user.primaryEventId, {
      include: [
        { model: Guest },
        { model: Task },
        {
          model: Photo,
          include: [
            {
              model: User,
              as: 'uploadedBy',
              attributes: ['id', 'name', 'email']
            }
          ]
        },
        { model: EventParty },
        { model: Vendor },
        { model: MoodBoard }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found." });
    }

    res.json({
  id: event.id,
  title: event.title,
  date: event.date,
  address: event.address,
  city: event.city,
  state: event.state,
  zipCode: event.zipCode,
  eventType: event.eventType,
  description: event.description,
  status: event.status
});
  } catch (err) {
    console.error('Event overview error:', err);
    res.status(500).json({ message: 'Failed to load event overview.', error: err.message });
  }
});


// Guest list preview
router.get('/guestlist-preview', requireAuth, async (req, res) => {
  try {
    const guests = await Guest.findAll({
      where: { EventId: req.user.primaryEventId },
      limit: 5
    });

    res.json(guests);
  } catch (err) {
    console.error('Guest list error:', err);
    res.status(500).json({ message: 'Failed to load guest list.', error: err.message });
  }
});

// Seating preview
router.get('/seating-preview', requireAuth, async (req, res) => {
  try {
    if (!['edit', 'full'].includes(req.user.planningPermissions)) {
      return res.status(403).json({ message: 'You do not have permission to view seating.' });
    }

    const tables = await Table.findAll({
      where: { EventId: req.user.primaryEventId },
      include: [{ model: Seat, attributes: ['id', 'GuestId', 'position'] }],
      limit: 3
    });

    if (!tables.length) {
      return res.json({ preview: 'No seating chart set up yet.' });
    }

    res.json({ preview: `You have ${tables.length} table(s) set up with seating.` });
  } catch (err) {
    console.error('Seating preview error:', err);
    res.status(500).json({ message: 'Failed to load seating chart', error: err.message });
  }
});

// Tasks preview
router.get('/tasks-preview', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { EventId: req.user.primaryEventId },
      include: [{ model: Member, attributes: ['id', 'name', 'role'] }],
      order: [['createdAt', 'ASC']],
      limit: 3
    });

    res.json(tasks);
  } catch (err) {
    console.error('Tasks preview error:', err);
    res.status(500).json({ message: 'Failed to load tasks.', error: err.message });
  }
});

// Vendors preview
router.get('/vendors-preview', requireAuth, async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      where: { EventId: req.user.primaryEventId },
      attributes: ['id', 'name', 'category', 'status'],
      order: [['createdAt', 'DESC']],
      limit: 3
    });

    res.json(vendors);
  } catch (err) {
    console.error('Vendors preview error:', err);
    res.status(500).json({ message: 'Failed to load vendor preview', error: err.message });
  }
});

// Photos preview
router.get('/photos-preview', requireAuth, async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: { EventId: req.user.primaryEventId },
      include: [
        { model: User, as: 'uploadedBy', attributes: ['id', 'name', 'email'] },
        { model: Event, attributes: ['id', 'title'] }
      ],
      limit: 3
    });

    res.json(photos);
  } catch (err) {
    console.error('Photos preview error:', err);
    res.status(500).json({ message: 'Failed to load photo album', error: err.message });
  }
});

module.exports = router;