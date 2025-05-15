const express = require('express');
const router = express.Router();

router.get('/restore', (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  });
  res.status(200).json({});
});

module.exports = router;

// const express = require('express');
// const router = express.Router();

// router.get('/restore', (req, res) => {
//   res.json({ 'XSRF-Token': req.csrfToken() });
// });

// module.exports = router;