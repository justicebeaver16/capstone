const express = require('express');
const path = require('path');
const router = express.Router();

if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.resolve(__dirname, '../../frontend/dist');
  router.use(express.static(frontendPath));
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

module.exports = router;

// const express = require('express');
// const path = require('path');
// const router = express.Router();
// const apiRouter = require('./api');

// router.use('/api', apiRouter);

// // Production
// if (process.env.NODE_ENV === 'production') {
//   const frontendPath = path.resolve(__dirname, '../../frontend/dist');

//   router.use(express.static(frontendPath));

//   // CSRF token for all non-API routes
//   router.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.sendFile(path.join(frontendPath, 'index.html'));
//   });
// }

// // Dev-only CSRF restore endpoint
// if (process.env.NODE_ENV !== 'production') {
//   router.get('/api/csrf/restore', (req, res) => {
//     const csrfToken = req.csrfToken();
//     res.cookie('XSRF-TOKEN', csrfToken);
//     res.status(200).json({
//       'XSRF-Token': csrfToken,
//     });
//   });
// }

// module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const apiRouter = require('./api');

// // router.use('/api', apiRouter);

// // // Static routes
// // // Serve React build files in production
// // if (process.env.NODE_ENV === 'production') {
// //   const path = require('path');
// //   // Serve the frontend's index.html file at the root route
// //   router.get('/', (req, res) => {
// //     res.cookie('XSRF-TOKEN', req.csrfToken());
// //     res.sendFile(
// //       path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
// //     );
// //   });

// //   // Serve the static assets in the frontend's build folder
// //   router.use(express.static(path.resolve("../frontend/dist")));

// //   // Serve the frontend's index.html file at all other routes NOT starting with /api
// //   router.get(/^(?!\/?api).*/, (req, res) => {
// //     res.cookie('XSRF-TOKEN', req.csrfToken());
// //     res.sendFile(
// //       path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
// //     );
// //   });
// // }

// // // Add a XSRF-TOKEN cookie in development
// // if (process.env.NODE_ENV !== 'production') {
// //   router.get("/api/csrf/restore", (req, res) => {
// //     const csrfToken = req.csrfToken();
// //     res.cookie("XSRF-TOKEN", csrfToken);
// //     res.status(200).json({
// //       'XSRF-Token': csrfToken
// //     });
// //   });
// // }

// // module.exports = router;
// // // // Testing
// // // router.get('/hello/world', function(req, res) {
// // //   res.cookie('XSRF-TOKEN', req.csrfToken());
// // //   res.send('Hello World!');
// // // });

// // // // Testing API
// // // router.post('/test', function(req, res) {
// // //     res.json({ requestBody: req.body });
// // //   });