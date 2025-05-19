const express = require('express');
const { Task } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware
const validateTask = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Task title is required'),
  check('EventId')
    .isInt()
    .withMessage('Valid EventId is required'),
  handleValidationErrors
];

// GET /api/tasks — All tasks for current user's primary event
router.get('/', requireAuth, async (req, res) => {
  try {
    const event = await Event.findByPk(req.user.primaryEventId);

    if (!event || event.UserId !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to access tasks for this event.' });
    }

    const tasks = await Task.findAll({
      where: { EventId: req.user.primaryEventId }
    });

    res.json(tasks);
  } catch (err) {
    console.error('Error in GET /api/tasks:', err);
    res.status(500).json({ error: 'Failed to load tasks.' });
  }
});
// router.get('/', requireAuth, async (req, res) => {
//   try {
//     if (!req.user || !req.user.primaryEventId) {
//       console.warn(`No primaryEventId found for user ${req.user?.email}`);
//       return res.status(400).json({ error: 'User does not have a primary event assigned.' });
//     }

//     const tasks = await Task.findAll({
//       where: { EventId: req.user.primaryEventId }
//     });

//     res.json(tasks);
//   } catch (err) {
//     console.error('Error in GET /api/tasks:', err);
//     res.status(500).json({ error: 'Failed to load tasks.' });
//   }
// });

// POST /api/tasks — Create a new task
router.post('/', requireAuth, validateTask, async (req, res) => {
  try {
    const { title } = req.body;
    const EventId = req.user.primaryEventId;

    if (!EventId) {
      return res.status(400).json({ error: 'User does not have a primary event assigned.' });
    }

    const newTask = await Task.create({
      title,
      EventId
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error in POST /api/tasks:', err);
    res.status(500).json({ error: 'Failed to create task.' });
  }
});

// DELETE /api/tasks/:id — Delete a task by ID
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    // Ensure task belongs to user's primary event
    if (task.EventId !== req.user.primaryEventId) {
      return res.status(403).json({ error: 'Not authorized to delete this task.' });
    }

    await task.destroy();
    res.status(204).end();
  } catch (err) {
    console.error('Error in DELETE /api/tasks/:id:', err);
    res.status(500).json({ error: 'Failed to delete task.' });
  }
});

module.exports = router;