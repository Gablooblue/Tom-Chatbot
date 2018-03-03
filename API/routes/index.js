var express = require('express');
var router = express.Router();
var ctrlEstablishments = require('../app_server/controllers/establishments');
require('../app_server/models/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/establishments', ctrlEstablishments.getAll );

module.exports = router;
