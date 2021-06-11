var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT product.id,product_img,product_name,details,price,intro FROM product INNER JOIN classify  ON product.classify_id = classify.id';
let catalog_sql = 'SELECT id,category_name FROM classify';
let data = new Array();
let data2 = new Array();

connection.query(catalog_sql, (err, result, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    data2 = result;
  }
});
//数据展示
router.get('/', function (req, res) {
  let user = req.session.user;
  if (user == undefined) {
    connection.query(show_sql + ' LIMIT 7', (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        data = result;
        res.render('index', {
          list: data,
          obj: 0
        });
      }
    });
  } else {
    connection.query(show_sql + ' LIMIT 7', (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        data = result;
        connection.query('SELECT COUNT(*) amount FROM cart WHERE user_id=' + user.id, (err, result, fields) => {
          if (err) {
            console.log(err.message);
          } else {
            data3 = result;
            res.render('index', {
              list: data,
              obj: data3[0].amount
            });
          }
        })
      }
    });
  }
});

//搜索
router.post('/search', (req, res) => {
  key = req.body.key;
  sql = show_sql;
  if (key) {
    sql += " where product_name like'%" + key + "%' || category_name like'%" + key + "%' ";
  }
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('shop', {
        list: result,
        list2: data2
      });
    }
  })
});

module.exports = router;