var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('checkout');
});

module.exports = router;