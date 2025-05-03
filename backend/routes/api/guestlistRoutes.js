const express = require('express');
const router = express.Router();
const guestlistController = require('../../controllers/guestlistController');
const auth = require('../../middleware/auth');

// @route   GET api/guestlist/:eventId
// @desc    Get all guests for an event
// @access  Private
router.get('/:eventId', auth, guestlistController.getGuestsByEvent);

// @route   POST api/guestlist/:eventId
// @desc    Add a new guest
// @access  Private
router.post('/:eventId', auth, guestlistController.addGuest);

// @route   PUT api/guestlist/:id
// @desc    Update guest RSVP
// @access  Public
router.put('/:id', guestlistController.updateRSVP);

// @route   DELETE api/guestlist/:id
// @desc    Delete a guest
// @access  Private
router.delete('/:id', auth, guestlistController.deleteGuest);

module.exports = router;