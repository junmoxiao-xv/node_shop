var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT id,product_img,product_name,details,price FROM product LIMIT 7';
let data = new Array();

//数据展示
router.get('/', function (req, res) {
  connection.query(show_sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      res.render('index', {
        list: data
      });
    }
  });
});


module.exports = router;