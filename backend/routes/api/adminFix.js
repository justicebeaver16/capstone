const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../../db/models');

const router = express.Router();

// Run all seeders
router.get('/run-all-seeders', async (req, res) => {
  const seedersPath = path.join(__dirname, '../../db/seeders');

  try {
    const files = fs
      .readdirSync(seedersPath)
      .filter(file => file.endsWith('.js'))
      .sort(); // run in order

    for (const file of files) {
      const seeder = require(path.join(seedersPath, file));
      if (seeder.up) {
        console.log(`Running seeder: ${file}`);
        await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
      }
    }

    res.json({ message: `Successfully ran ${files.length} seeders.` });
  } catch (err) {
    console.error('Error running seeders:', err);
    res.status(500).json({ error: 'Failed to run all seeders' });
  }
});

// Rehash seeded users (in case any were inserted with plain text passwords)
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

  res.json({ message: `✅ Rehashed ${updated} users.` });
});

// Debug route to inspect stored user password hash
router.get('/check-password/:email', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      email: user.email,
      password: user.password // Remove this after testing
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;