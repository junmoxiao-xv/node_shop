var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var connection = require('./conmysql');

router.get('/', function(req, res) {
  res.render('adlogin',{message:''});
});

router.post('/',(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    connection.query('SELECT * FROM admin WHERE email='+connection.escape(email)+'AND password='+connection.escape(password),(err,result,fields)=>{
      if(err){
        console.log(err.message);
        return;
      }
      var admin = result[0];
      if(admin){
        res.redirect('/tables');
      }else{
        res.render('adlogin',{message:'邮箱或密码错误'});
      }
    });
  });

module.exports = router;