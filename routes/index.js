const express = require('express');
const restRoutes = require('./REST');

const router = express.Router();

router.use('/REST', restRoutes);

module.exports = router;
