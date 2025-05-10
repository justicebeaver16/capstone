const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const { syncDatabase } = require('./db/models');
const routes = require('./routes');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');


// Load env vars
dotenv.config();


// Route imports
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const moodboardRoutes = require('./routes/moodboardRoutes');
// const vendorRoutes = require('./routes/vendorRoutes');
// const guestlistRoutes = require('./routes/guestlistRoutes');
// const seatingRoutes = require('./routes/seatingRoutes');
// const eventpartyRoutes = require('./routes/eventpartyRoutes');
// const scheduleRoutes = require('./routes/scheduleRoutes');
// const photoRoutes = require('./routes/photoRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');

// Initialize
const isProduction = environment === 'production';
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes); // Connect all the routes

// Connect to database
syncDatabase();

// API Routes
// app.use('/api/auth', require('./routes/api/authRoutes'));
// app.use('/api/users', require('./routes/api/userRoutes'));
// app.use('/api/events', require('./routes/api/eventRoutes'));
// app.use('/api/moodboard', require('./routes/api/moodboardRoutes'));
// app.use('/api/vendors', require('./routes/api/vendorRoutes'));
// app.use('/api/guestlist', require('./routes/api/guestlistRoutes'));
// app.use('/api/seating', require('./routes/api/seatingRoutes'));
// app.use('/api/eventparty', require('./routes/api/eventpartyRoutes'));
// app.use('/api/schedule', require('./routes/api/scheduleRoutes'));
// app.use('/api/photos', require('./routes/api/photoRoutes'));
// app.use('/api/playlist', require('./routes/api/playlistRoutes'));


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  // Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

  // Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

  // Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

  // Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// // Use Render's PORT environment variable
// const PORT = process.env.PORT || 5000;

// // Database connection and server start
// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully');
//     return sequelize.sync();
//   })
//   .then(() => {
//     app.listen(PORT, '0.0.0.0', () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//     process.exit(1);
//   });

  module.exports = app;