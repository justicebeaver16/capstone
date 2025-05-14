const express = require('express');
const router = express.Router();

router.get('/restore', (req, res) => {
  res.json({ 'XSRF-Token': req.csrfToken() });
});

module.exports = router;