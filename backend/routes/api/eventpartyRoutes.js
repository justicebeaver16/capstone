const express = require('express');
const { EventParty } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePartyMember = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
  check('role')
    .exists({ checkFalsy: true })
    .withMessage('Role is required'),
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  handleValidationErrors
];

// Get all party members for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const members = await EventParty.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id }
    });
    res.json({ EventParty: members });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch party members', error: err.message });
  }
});

// Add a new party member
router.post('/', requireAuth, validatePartyMember, async (req, res) => {
  const { name, role, contactInfo, notes, eventId } = req.body;
  try {
    const member = await EventParty.create({
      userId: req.user.id,
      eventId,
      name,
      role,
      contactInfo,
      notes
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add party member', error: err.message });
  }
});

// Update a party member
router.put('/:memberId', requireAuth, validatePartyMember, async (req, res) => {
  try {
    const member = await EventParty.findByPk(req.params.memberId);
    if (!member) return res.status(404).json({ message: "Party member couldn't be found" });
    if (member.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await member.update(req.body);
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update party member', error: err.message });
  }
});

// Delete a party member
router.delete('/:memberId', requireAuth, async (req, res) => {
  try {
    const member = await EventParty.findByPk(req.params.memberId);
    if (!member) return res.status(404).json({ message: "Party member couldn't be found" });
    if (member.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await member.destroy();
    res.json({ message: 'Successfully deleted party member' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete party member', error: err.message });
  }
});

module.exports = router;