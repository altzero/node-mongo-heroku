var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('home');
});

router.get('/intro', function (req, res) {
  res.render('intro');
});

router.get('/settings', function (req, res) {
  res.render('settings');
});

module.exports = router;
