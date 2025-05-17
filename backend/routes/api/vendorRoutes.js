const express = require('express');
const { Vendor, VendorAttachment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validation middleware
const validateVendor = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Vendor name is required'),
  check('category')
    .exists({ checkFalsy: true })
    .withMessage('Vendor category is required'),
  check('EventId')
    .isInt()
    .withMessage('Valid EventId is required'),
  handleValidationErrors
];

// GET /api/vendors — All vendors for current user's primary event
router.get('/', requireAuth, async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      where: { EventId: req.user.primaryEventId },
      include: [{ model: VendorAttachment }]
    });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vendors', error: err.message });
  }
});

// GET /api/vendors/:eventId — All vendors for a specific event
router.get('/:eventId', requireAuth, async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  if (isNaN(eventId)) {
    return res.status(400).json({ message: 'Invalid event ID' });
  }

  try {
    const vendors = await Vendor.findAll({
      where: { EventId: eventId },
      include: [{ model: VendorAttachment }]
    });

    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vendors for event', error: err.message });
  }
});

// POST /api/vendors — Create a new vendor
router.post('/', requireAuth, validateVendor, async (req, res) => {
  if (!['edit', 'full'].includes(req.user.planningPermissions)) {
    return res.status(403).json({ message: 'You do not have permission to add vendors.' });
  }

  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add vendor', error: err.message });
  }
});

// PUT /api/vendors/:vendorId — Update a vendor
router.put('/:vendorId', requireAuth, validateVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor couldn't be found" });
    }

    if (
      vendor.EventId !== req.user.primaryEventId ||
      !['edit', 'full'].includes(req.user.planningPermissions)
    ) {
      return res.status(403).json({ message: 'You do not have permission to update this vendor.' });
    }

    await vendor.update(req.body);
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vendor', error: err.message });
  }
});

// DELETE /api/vendors/:vendorId — Delete a vendor
router.delete('/:vendorId', requireAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor couldn't be found" });
    }

    if (
      vendor.EventId !== req.user.primaryEventId ||
      !['edit', 'full'].includes(req.user.planningPermissions)
    ) {
      return res.status(403).json({ message: 'You do not have permission to delete this vendor.' });
    }

    await vendor.destroy();
    res.json({ message: 'Successfully deleted vendor' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vendor', error: err.message });
  }
});

module.exports = router;