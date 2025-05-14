const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const { syncDatabase } = require('./db/models');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');
const routes = require('./routes');

dotenv.config();

const isProduction = environment === 'production';
const app = express();

// Sync Database
// syncDatabase();

// Core Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middleware
if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// CSRF Protection
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// API Routes
app.use('/api/csrf', require('./routes/api/csrf'));
app.use('/api/session', require('./routes/api/session'));
app.use('/api/auth', require('./routes/api/authRoutes'));
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/events', require('./routes/api/eventRoutes'));
app.use('/api/moodboard', require('./routes/api/moodboardRoutes'));
app.use('/api/vendors', require('./routes/api/vendorRoutes'));
app.use('/api/guestlist', require('./routes/api/guestlistRoutes'));
app.use('/api/seating', require('./routes/api/seatingRoutes'));
app.use('/api/eventparty', require('./routes/api/eventpartyRoutes'));
app.use('/api/schedule', require('./routes/api/scheduleRoutes'));
app.use('/api/photos', require('./routes/api/photoRoutes'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (isProduction) {
  const staticPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// 404 Handler (for APIs only, will not trigger in production for frontend)
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Sequelize Validation Error Formatter
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    const errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Global Error Handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

// Start the server
if (require.main === module) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
  });
}

module.exports = app;