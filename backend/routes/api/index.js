const router = require('express').Router();
const { restoreUser } = require("../../utils/auth.js");

// Route modules
const adminFixRouter = require('./adminFix');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const dashboardRouter = require('./dashboardRoutes.js');
const csrfRouter = require('./csrf.js');
const authRoutes = require('./authRoutes.js');
const userRoutes = require('./userRoutes.js');
const eventRoutes = require('./eventRoutes.js');
const moodboardRoutes = require('./moodboardRoutes.js');
const vendorRoutes = require('./vendorRoutes.js');
const taskRoutes = require('./taskRoutes');
const guestlistRoutes = require('./guestlistRoutes.js');
const seatingRoutes = require('./seatingRoutes.js');
const eventpartyRoutes = require('./eventpartyRoutes.js');
const scheduleRoutes = require('./scheduleRoutes.js');
const photoRoutes = require('./photoRoutes.js');

// Middleware to restore user session
router.use(restoreUser);

// CSRF Route
router.use('/csrf', csrfRouter);

// Auth/session routes
router.use('/admin-fix', adminFixRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/dashboard', dashboardRouter);


// App feature routes
router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/moodboard', moodboardRoutes);
router.use('/vendors', vendorRoutes);
router.use('/tasks', taskRoutes);
router.use('/guestlist', guestlistRoutes);
router.use('/seating', seatingRoutes);
router.use('/eventparty', eventpartyRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/photos', photoRoutes);

// Test route
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;