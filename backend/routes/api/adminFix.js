const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');

const router = express.Router();

// TEMPORARY: Hash plain-text passwords for all users
// router.post('/rehash-all-passwords', async (req, res) => {
//   try {
//     const users = await User.findAll();

//     let updated = 0;
//     for (const user of users) {
//       if (!user.password.startsWith('$2')) {
//         user.password = bcrypt.hashSync(user.password, 10);
//         await user.save();
//         updated++;
//       }
//     }

//     res.json({ message: `Updated ${updated} user passwords.` });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error updating user passwords' });
//   }
// });
router.get('/check-password/:email', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      email: user.email,
      password: user.password // remove after testing
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;