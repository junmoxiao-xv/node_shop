var express = require('express');
var connection = require('./conmysql');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function (req, res) {
  res.render('login', { message: '' });
});

router.post('/', (req, res) => {
  let name = req.body.name;
  let password = req.body.password;
  var hash = crypto.createHash('md5');
  hash.update(password);
  password = hash.digest('hex');
  connection.query('SELECT * FROM users WHERE name=' + connection.escape(name) + 'AND password=' + connection.escape(password), (err, result, fields) => {
    if (err) {
      console.log(err.message);
      return;
    }
    var user = result[0];
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.render('login', { message: '用户名或密码错误' });
    }
  });
});

module.exports = router;