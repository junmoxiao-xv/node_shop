var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT product.id,product_img,product_name,details,price,intro FROM product INNER JOIN classify  ON product.classify_id = classify.id';
let data = new Array();

connection.query(show_sql, (err, result, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    data = JSON.parse(JSON.stringify(result));
  }
});

router.get('/', function (req, res) {
  res.render('shop', {
    list: data
  });
});

router.get('/:id', (req, res) => {
  connection.query(show_sql + ' WHERE product.id!=' + req.params.id + ' LIMIT 5', (err, result, fields) => {
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

router.post('/search',(req,res) => {
  key = req.body.key;
  category_name = req.body.category_name;
  sql = show_sql;
  if (key) {
    sql += " where product_name like'%" + key + "%' || category_name like'%"+ key + "%' ";
  }
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('shop', {
        list: result
      });
    }
  })
});


module.exports = router;