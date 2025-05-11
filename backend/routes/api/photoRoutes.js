const express = require('express');
const { Photo } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePhoto = [
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Image URL is required'),
  handleValidationErrors
];

// Get all photos for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const photos = await Photo.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({ Photos: photos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch photos', error: err.message });
  }
});

// Upload a photo
router.post('/', requireAuth, validatePhoto, async (req, res) => {
  const { imageUrl, caption, eventId } = req.body;
  try {
    const photo = await Photo.create({
      userId: req.user.id,
      eventId,
      imageUrl,
      caption
    });
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload photo', error: err.message });
  }
});

// Like or comment on a photo
router.put('/:photoId', requireAuth, async (req, res) => {
  const { likes, comment } = req.body;
  try {
    const photo = await Photo.findByPk(req.params.photoId);
    if (!photo) return res.status(404).json({ message: "Photo couldn't be found" });
    if (photo.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await photo.update({ likes, comment });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update photo', error: err.message });
  }
});

// Delete a photo
router.delete('/:photoId', requireAuth, async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.photoId);
    if (!photo) return res.status(404).json({ message: "Photo couldn't be found" });
    if (photo.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await photo.destroy();
    res.json({ message: 'Successfully deleted photo' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete photo', error: err.message });
  }
});

module.exports = router;