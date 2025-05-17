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
  MoodBoard
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
        { model: Guest, attributes: ['id', 'name', 'email'] },
        { model: Task, attributes: ['id', 'title', 'completed'] },
        { model: Photo, attributes: ['id', 'imageUrl', 'uploadedById'] },
        { model: EventParty },
        { model: Vendor },
        { model: MoodBoard }
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found." });
    }

    res.json(event);
  } catch (err) {
    console.error('Event overview error:', err);
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
    console.error('Guest list error:', err);
    res.status(500).json({ message: 'Failed to load guest list.', error: err.message });
  }
});

// Get seating preview (only for users with edit/full planning permissions)
router.get('/seating-preview', requireAuth, async (req, res) => {
  try {
    const permission = req.user.planningPermissions;

    if (!['edit', 'full'].includes(permission)) {
      return res.status(403).json({ message: 'You do not have permission to view seating.' });
    }

    // You can adjust this logic based on your schema
    const { Table, Seat } = require('../../db/models');

    const tables = await Table.findAll({
      where: { EventId: req.user.primaryEventId },
      include: [
        {
          model: Seat,
          attributes: ['id', 'GuestId', 'position']
        }
      ],
      limit: 3
    });

    res.json({ tables });
  } catch (err) {
    console.error('Seating preview error:', err);
    res.status(500).json({ message: 'Failed to load seating chart', error: err.message });
  }
});

// Get tasks preview
router.get('/tasks-preview', requireAuth, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { EventId: req.user.primaryEventId },
      order: [['createdAt', 'ASC']],
      limit: 3,
      include: [
        {
          model: Member,
          attributes: ['id', 'name', 'role']
        }
      ]
    });

    res.json(tasks);
  } catch (err) {
    console.error('Tasks preview error:', err);
    res.status(500).json({ message: 'Failed to load tasks.', error: err.message });
  }
});

// Get vendor preview
router.get('/vendors-preview', requireAuth, async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      where: { EventId: req.user.primaryEventId },
      limit: 3,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'category', 'status']
    });
console.log('FOUND VENDORS:', vendors);
    res.json(vendors);
  } catch (err) {
    console.error('Vendors preview error:', err);
    res.status(500).json({ message: 'Failed to load vendor preview', error: err.message });
  }
});

// Get photo album preview
router.get('/photos-preview', requireAuth, async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: { EventId: req.user.primaryEventId },
      limit: 3,
      include: [
        {
          model: User,
          as: 'uploadedBy',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Event,
          attributes: ['id', 'title']
        }
      ]
    });

    res.json(photos);
  } catch (err) {
    console.error('Photos preview error:', err);
    res.status(500).json({ message: 'Failed to load photo album', error: err.message });
  }
});

module.exports = router;

// const express = require('express');
// const { requireAuth } = require('../../utils/auth');
// const { Event, Guest, Task, Photo, User } = require('../../db/models');

// const router = express.Router();

// // Get event overview for user's primary event
// router.get('/event-overview', requireAuth, async (req, res) => {
//   try {
//     if (!req.user.primaryEventId) {
//       return res.status(404).json({ message: 'No primary event assigned to your account.' });
//     }

//     const event = await Event.findByPk(req.user.primaryEventId);

//     if (!event) {
//       return res.status(404).json({ message: "Event couldn't be found." });
//     }

//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load event overview.', error: err.message });
//   }
// });

// // Get guest list preview
// router.get('/guestlist-preview', requireAuth, async (req, res) => {
//   try {
//     const guests = await Guest.findAll({
//       where: { EventId: req.user.primaryEventId },
//       limit: 5
//     });

//     res.json(guests);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load guest list.', error: err.message });
//   }
// });

// // Get tasks preview
// router.get('/tasks-preview', requireAuth, async (req, res) => {
//   try {
//     const tasks = await Task.findAll({
//       where: { EventId: req.user.primaryEventId },
//       order: [['createdAt', 'ASC']],
//       limit: 3
//     });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to load tasks.', error: err.message });
//   }
// });

// // Get photo album preview
// router.get('/photos-preview', requireAuth, async (req, res) => {
//   try {
//     const photos = await Photo.findAll({
//       where: { EventId: req.user.primaryEventId },
//       limit: 3
//     });

//     res.json(photos);
//   } catch (err) {
//     console.error('Photos preview error:', err);
//     res.status(500).json({ message: 'Failed to load photo album', error: err.message });
//   }
// });

// module.exports = router;