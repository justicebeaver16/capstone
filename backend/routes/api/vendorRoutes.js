const express = require('express');
const { Vendor } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateVendor = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Vendor name is required'),
  check('service')
    .exists({ checkFalsy: true })
    .withMessage('Vendor service type is required'),
  check('eventId')
    .isInt()
    .withMessage('Valid event ID is required'),
  handleValidationErrors
];

// Get all vendors for an event
router.get('/:eventId', requireAuth, async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      where: { eventId: req.params.eventId, userId: req.user.id }
    });
    res.json({ Vendors: vendors });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vendors', error: err.message });
  }
});

// Add a new vendor
router.post('/', requireAuth, validateVendor, async (req, res) => {
  const { name, service, contactInfo, notes, eventId } = req.body;
  try {
    const vendor = await Vendor.create({
      userId: req.user.id,
      eventId,
      name,
      service,
      contactInfo,
      notes
    });
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add vendor', error: err.message });
  }
});

// Update a vendor
router.put('/:vendorId', requireAuth, validateVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor couldn't be found" });
    if (vendor.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await vendor.update(req.body);
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vendor', error: err.message });
  }
});

// Delete a vendor
router.delete('/:vendorId', requireAuth, async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor couldn't be found" });
    if (vendor.userId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await vendor.destroy();
    res.json({ message: 'Successfully deleted vendor' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vendor', error: err.message });
  }
});

module.exports = router;