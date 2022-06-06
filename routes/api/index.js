const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Add the prefix of '/users' to routes created in 'user-routes.js'
router.use('/users', userRoutes);

// Add the prefix of '/thoughts' to routes created in 'though-routes.js'
router.use('/thoughts', thoughtRoutes);

module.exports = router;
