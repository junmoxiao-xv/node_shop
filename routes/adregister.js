var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('./bean/user');
var connection = require('./conmysql');

router.get('/', function(req, res) {
  res.render('adregister',{message:''});
});

router.post('/', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    connection.query('SELECT * FROM admin WHERE email='+connection.escape(email),(err,result,fields)=>{
      let a = result[0];
      if(a){
        res.render('adregister',{message:'该邮箱已注册'})
      }else{
        connection.query('INSERT INTO admin (password,email) VALUES(?,?)',[password,req.body.email],(err,result,fields)=>{
          if(err){
            console.log(err.message);
          }
        });
          let admin = new User(password,req.body.email);
          req.session.admin = admin;
          res.redirect('/adlogin',{message:'注册成功'});
      }
    });
  });
  

module.exports = router;