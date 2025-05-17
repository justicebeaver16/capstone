const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');

const router = express.Router();

// TEMP: Bulk insert seeded users into production DB
router.get('/run-user-seeds', async (req, res) => {
  try {
    const users = [
      {
        name: 'Olivia Martinez',
        email: 'olivia.martinez@example.com',
        password: bcrypt.hashSync('weddingready123', 10),
        avatar: 'default-bride.png',
        role: 'bride',
        eventRole: 'Bride',
        planningPermissions: 'full',
        isVendor: false,
        vendorId: null,
        primaryEventId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Rivera',
        email: 'emily.rivera@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-user.png',
        role: 'planning_team',
        eventRole: 'Design Assistant',
        planningPermissions: 'edit',
        isVendor: false,
        vendorId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sophia Kim',
        email: 'sophia.kim@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-user.png',
        role: 'planning_team',
        eventRole: 'Vendor Liaison',
        planningPermissions: 'view',
        isVendor: false,
        vendorId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-admin.png',
        role: 'admin',
        planningPermissions: 'full',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        email: 'bride@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-bride.png',
        role: 'bride',
        eventRole: 'Bride',
        planningPermissions: 'full',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John Doe',
        email: 'groom@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-groom.png',
        role: 'groom',
        eventRole: 'Groom',
        planningPermissions: 'full',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sarah Williams',
        email: 'planner@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-planner.png',
        role: 'event_planner',
        eventRole: 'Wedding Planner',
        planningPermissions: 'full',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Johnson',
        email: 'maid@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-team.png',
        role: 'planning_team',
        eventRole: 'Maid of Honor',
        planningPermissions: 'edit',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mike Thompson',
        email: 'bestman@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-team.png',
        role: 'planning_team',
        eventRole: 'Best Man',
        planningPermissions: 'view',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lisa Davis',
        email: 'bridesmaid@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-attendee.png',
        role: 'attendee',
        eventRole: 'Bridesmaid',
        planningPermissions: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Catering Services',
        email: 'catering@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-vendor.png',
        role: 'vendor',
        isVendor: true,
        vendorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Photography Studio',
        email: 'photo@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-vendor.png',
        role: 'vendor',
        isVendor: true,
        vendorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: bcrypt.hashSync('password123', 10),
        avatar: 'default-user.png',
        role: 'user',
        planningPermissions: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await User.bulkCreate(users, { ignoreDuplicates: true });

    res.json({ message: 'Seeded users into production DB.' });
  } catch (err) {
    console.error('Error seeding users:', err);
    res.status(500).json({ error: 'Seeding failed' });
  }
});

// Rehash seeded users that might still have plain text passwords
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

// 🔍 Check a user's stored password (for debugging only)
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

// router.get('/delete-user/olivia', async (req, res) => {
//   try {
//     const deleted = await User.destroy({
//       where: { email: 'olivia.martinez@example.com' }
//     });

//     if (deleted) {
//       res.json({ message: 'Olivia deleted successfully.' });
//     } else {
//       res.status(404).json({ message: 'Olivia not found.' });
//     }
//   } catch (err) {
//     console.error('Error deleting Olivia:', err);
//     res.status(500).json({ error: 'Server error while deleting Olivia' });
//   }
// });

module.exports = router;