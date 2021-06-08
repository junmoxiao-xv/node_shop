var express = require('express');
var router = express.Router();
var connection = require('./conmysql');
var sd = require('silly-datetime');

let show_sql = 'SELECT product.id pid,cart.id cid,product_img,product_name,price,amount FROM product INNER JOIN cart ON product.id=cart.product_id';
let data = new Array();
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

//数据展示
router.get('/', function (req, res) {
  let user = req.session.user;
  connection.query(show_sql + ' AND user_id=' + user.id + ' ORDER BY cart.id DESC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      connection.query('SELECT IFNULL(SUM(price*amount),0) total_prices FROM product INNER JOIN cart ON product.id=cart.product_id AND user_id=' + user.id, (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          row = JSON.parse(JSON.stringify(result));
          res.render('cart', {
            list: data,
            total_prices: row[0].total_prices
          });
        }
      });
    }
  });
});

//购物车商品数量
//增加
router.post('/addprice/:id', (req, res) => {
  let user = req.session.user;
  connection.query('UPDATE cart SET amount=amount+1 WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      connection.query('SELECT IFNULL(SUM(price*amount),0) total_prices FROM product INNER JOIN cart ON product.id=cart.product_id AND user_id=' + user.id, (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          row = JSON.parse(JSON.stringify(result));
          res.render('cart', {
            list: data,
            total_prices: row[0].total_prices
          });
        }
      });
    }
  })
});

//减少
router.post('/reduceprice/:id', (req, res) => {
  let user = req.session.user;
  connection.query('UPDATE cart SET amount=amount-1 WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('cart', {
        list: data,
        total_prices: row[0].total_prices
      });
    }
  })
});

//搜索
router.post('/search', (req, res) => {
  let user = req.session.user;
  product_name = req.body.product_name;
  sql = show_sql;
  if (product_name) {
    sql += " AND user_id="+ user.id +" WHERE product_name like'%" + product_name + "%' ";
  }else{
    sql += " AND user_id="+ user.id;
  }
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('cart', {
        list: result,
        total_prices: row[0].total_prices
      });
    }
  })
});

//删除
router.delete('/del/:id', (req, res) => {
  let user = req.session.user;
  connection.query('DELETE FROM cart WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('cart', {
        list: data,
        total_prices: row[0].total_prices
      });
    }
  })
});

//清空购物车
router.delete('/clean', (req, res) => { 
  let user = req.session.user;
  connection.query('DELETE FROM cart WHERE user_id=' + user.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('cart', {
        list: data,
        total_prices: row[0].total_prices
      });
    }
  })
});


module.exports = router;