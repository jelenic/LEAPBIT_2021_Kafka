const express = require('express');
const restCtrl = require('../controller/rest');

const router = express.Router();
module.exports = router;

// rute
router.get('/matchId/:matchId', restCtrl.defaultQuery);
router.get('/category/:categoryId', restCtrl.defaultQuery);
router.get('/tournament/:tournamentId', restCtrl.defaultQuery);
router.get('/sport/:sportId', restCtrl.defaultQuery);
router.get('/teamname/:teamname', restCtrl.defaultQuery);

router.get('/Q/sport/:sportid/matchId/:matchId', restCtrl.defaultQuerySQL);
router.get('/Q/sport/:sportid/', restCtrl.defaultQuerySQL);
