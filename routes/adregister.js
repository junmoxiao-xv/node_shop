var express = require('express');
var router = express.Router();
var crypto = require('crypto');
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
          res.redirect('/adlogin');
      }
    });
  });
  

module.exports = router;