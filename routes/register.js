var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('./bean/user');
var connection = require('./conmysql')

router.get('/', (req, res) => {
  res.render('register',{message:''});
});

router.post('/', (req,res) => {
  let name = req.body.name;
  let password = req.body.password;
  var hash = crypto.createHash('md5');
  hash.update(password);
  password = hash.digest('hex');
  connection.query('SELECT * FROM users WHERE name='+connection.escape(name),(err,result,fields)=>{
    let a = result[0];
    if(a){
      res.render('register',{message:'用户名已存在'})
    }else{
      connection.query('INSERT INTO users (name,password,sex,phone,email) VALUES(?,?,?,?,?)',[name,password,req.body.sex,req.body.phone,req.body.email],(err,result,fields)=>{
        if(err){
          console.log(err.message);
        }
      });
        let user = new User(name,password,req.body.phone,req.body.sex,req.body.email);
        req.session.user = user;
        res.redirect('/login');
    }
  });
});

module.exports = router;