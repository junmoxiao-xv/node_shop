var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT product_img,product_name,price,intro FROM product';
let data = new Array();

router.get('/', function (req, res) {
  connection.query(show_sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      res.render('shop', {
        list: data
      });
    }
  });
});

module.exports = router;