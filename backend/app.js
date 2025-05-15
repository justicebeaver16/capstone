const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const { ValidationError } = require('sequelize');
const routes = require('./routes');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
console.log('Running in production mode:', isProduction);

const app = express();

// Core Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// CORS
app.use(cors({
  origin: 'https://its-happening.onrender.com',
  credentials: true,
}));

// CSRF
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax',
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use('/api', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve frontend
if (isProduction) {
  const staticPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// 404 API fallback
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Sequelize Validation Errors
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

module.exports = app;