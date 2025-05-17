const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../../db/models');

const router = express.Router();

// Middleware to block sensitive routes in production
const blockInProduction = (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'This operation is disabled in production.' });
  }
  next();
};

// GET /run-all-seeders – Run all seed files in order
router.get('/run-all-seeders', async (req, res) => {
  const seedersPath = path.join(__dirname, '../../db/seeders');

  try {
    const files = fs
      .readdirSync(seedersPath)
      .filter(file => file.endsWith('.js'))
      .sort(); // Ensure files run in order

    let count = 0;

    for (const file of files) {
      const seederPath = path.join(seedersPath, file);
      const seeder = require(seederPath);

      if (typeof seeder.up === 'function') {
        console.log(`Running seeder: ${file}`);
        await seeder.up(sequelize.getQueryInterface(), sequelize.constructor);
        count++;
      } else {
        console.warn(`Skipping: ${file} (no 'up' function)`);
      }
    }

    res.json({ message: `Successfully ran ${count} seeders.` });
  } catch (err) {
    console.error('Error running seeders:', err);
    res.status(500).json({ error: 'Failed to run all seeders' });
  }
});

// POST /rehash-all-seeded – Rehash any plain-text passwords (DEV ONLY)
router.post('/rehash-all-seeded', blockInProduction, async (req, res) => {
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

  res.json({ message: `🔐 Rehashed ${updated} users.` });
});

// GET /check-password/:email – View hashed password (DEV ONLY)
router.get('/check-password/:email', blockInProduction, async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.params.email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      email: user.email,
      password: user.password // REMOVE THIS ROUTE BEFORE PRODUCTION
    });
  } catch (err) {
    console.error('Password check error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;