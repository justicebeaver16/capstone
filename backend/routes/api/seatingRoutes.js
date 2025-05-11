const express = require('express');
const { Seating } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSeating = [
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  check('tableNumber')
    .isInt()
    .withMessage('Table number must be an integer'),
  check('guestId')
    .isInt()
    .withMessage('Valid guest ID is required'),
  handleValidationErrors
];

// Get all seating assignments for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const seating = await Seating.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id }
    });
    res.json({ Seating: seating });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch seating data', error: err.message });
  }
});

// Assign a guest to a table
router.post('/', requireAuth, validateSeating, async (req, res) => {
  const { eventId, tableNumber, guestId } = req.body;
  try {
    const seating = await Seating.create({
      userId: req.user.id,
      eventId,
      tableNumber,
      guestId
    });
    res.status(201).json(seating);
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign seating', error: err.message });
  }
});

// Update a seating assignment
router.put('/:seatingId', requireAuth, validateSeating, async (req, res) => {
  try {
    const seating = await Seating.findByPk(req.params.seatingId);
    if (!seating) return res.status(404).json({ message: "Seating assignment couldn't be found" });
    if (seating.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await seating.update(req.body);
    res.json(seating);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update seating', error: err.message });
  }
});

// Delete a seating assignment
router.delete('/:seatingId', requireAuth, async (req, res) => {
  try {
    const seating = await Seating.findByPk(req.params.seatingId);
    if (!seating) return res.status(404).json({ message: "Seating assignment couldn't be found" });
    if (seating.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await seating.destroy();
    res.json({ message: 'Successfully deleted seating assignment' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete seating', error: err.message });
  }
});

module.exports = router;