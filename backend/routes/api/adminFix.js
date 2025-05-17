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

router.post('/rehash-all-seeded', async (req, res) => {
  const emails = [
    'olivia.martinez@example.com',
    'emily.rivera@example.com',
    'sophia.kim@example.com',
    'admin@example.com',
    'planner@example.com',
    'maid@example.com',
    'bestman@example.com',
    'bridesmaid@example.com',
    'catering@example.com',
    'photo@example.com',
    'user@example.com'
  ];

  let updated = 0;

  for (const email of emails) {
    const user = await User.findOne({ where: { email } });
    if (user && !user.password.startsWith('$2')) {
      user.password = bcrypt.hashSync('password123', 10);
      await user.save();
      updated++;
    }
  }

  res.json({ message: `Rehashed ${updated} users.` });
});

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

router.delete('/delete-user/olivia', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { email: 'olivia.martinez@example.com' }
    });

    if (deleted) {
      res.json({ message: 'Deleted Olivia from production DB.' });
    } else {
      res.status(404).json({ message: 'No such user found.' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;