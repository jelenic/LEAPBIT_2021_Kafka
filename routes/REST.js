const express = require('express');
const restCtrl = require('../controller/rest');

const router = express.Router();
module.exports = router;

// rute
router.get('/matchId/:matchId', restCtrl.getSingleMatchById);
/* router.get('/category/:category', restCtrl.);
router.get('/tournament/:tournament', restCtrl.); */
