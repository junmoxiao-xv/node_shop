var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT id,product_img,product_name,price,intro,details FROM product';
let data = new Array();

//数据展示
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

router.get('/shopsingle/:id', (req, res) => {
  connection.query(show_sql+' WHERE id!='+req.params.id+' LIMIT 5', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      row = JSON.parse(JSON.stringify(result));
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
          res.render('shopsingle', {
            obj: data[i],
            list: row
          });
        }
      }
    }
  });

});

module.exports = router;