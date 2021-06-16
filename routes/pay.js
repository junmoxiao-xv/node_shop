var express = require('express');
var connection = require('./conmysql');
var router = express.Router();
var crypto = require('crypto');

router.get('/', function(req, res) {
  res.render('pay',{message:''});
});

router.post('/', (req, res) => {
    let user = req.session.user;
    let password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    connection.query('SELECT * FROM users WHERE id=' + connection.escape(user.id) + ' AND password=' + connection.escape(password), (err, result, fields) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if(result[0]){
          res.redirect('thankyou');
      }else{
        res.render('pay',{message:'密码错误'})
      }
    });
  });
module.exports = router;