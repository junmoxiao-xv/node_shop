var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT product.id,product_img,product_name,price FROM product INNER JOIN cart ON product.id=cart.product_id';
let data = new Array();

//数据展示
router.get('/', function (req, res) {
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

module.exports = router;