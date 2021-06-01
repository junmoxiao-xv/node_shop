var express = require('express');
var router = express.Router();
var connection = require('./conmysql');
var sd = require('silly-datetime');

let show_sql = 'SELECT product.id,product_img,product_name,price FROM product INNER JOIN cart ON product.id=cart.product_id';
let data = new Array();
let time = sd.format(new Date(), 'YYY-MM-DD HH:mm');

//数据展示
router.get('/', function (req, res) {
  let user = req.session.user;
  connection.query(show_sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      res.render('cart', {
        list: data
      });
    }
  });
});

//搜索
router.post('/search', (req, res) => {
  product_name = req.body.product_name;
  sql = show_sql;
  if (product_name) {
    sql += " WHERE product_name like'%" + product_name + "%' ";
  }
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('cart', {
        list: result
      });
    }
  })
});

//加入购物车
router.get('/add', (req, res) => {
  let user = req.session.user;
  if(user == undefined){
    res.redirect('/login');
  }else{

  }
});

module.exports = router;