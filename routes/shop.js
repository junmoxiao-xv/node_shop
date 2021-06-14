var express = require('express');
var router = express.Router();
var connection = require('./conmysql');
var sd = require('silly-datetime');

let show_sql = 'SELECT product.id,product_img,product_name,details,price,intro FROM product INNER JOIN classify  ON product.classify_id = classify.id';
let catalog_sql = 'SELECT id,category_name FROM classify';
let data = new Array();
let data2 = new Array();
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');



connection.query(catalog_sql, (err, result, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    data2 = JSON.parse(JSON.stringify(result));
  }
});

//数据展示
router.get('/', function (req, res) {
  let  page
  connection.query(show_sql+' ORDER BY product.id DESC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      res.render('shop', {
        list: data,
        list2: data2
      });
    }
  });

});

//商品详情
router.get('/:id', (req, res) => {
  connection.query(show_sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = result;
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
    }
  });
  
});

//搜索框搜索
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

//目录分类搜索
router.get('/category/:id', (req, res) => {
  connection.query(show_sql + ' WHERE classify.id =' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      row2 = JSON.parse(JSON.stringify(result));
      res.render('shop', {
        list: row2,
        list2: data2
      });
    }
  });
});

//价格升序展示
router.get('/price/asc', (req, res) => {
  connection.query(show_sql + ' ORDER BY price ASC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('shop', {
        list: result,
        list2: data2
      })
    }
  })
});

//价格降序展示
router.get('/price/desc', (req, res) => {
  connection.query(show_sql + ' ORDER BY price DESC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('shop', {
        list: result,
        list2: data2
      })
    }
  })
});

//加入购物车
router.post('/add/:id', (req, res) => {
  let user = req.session.user;
  if (user == undefined) {
    res.redirect('/login');
  } else {
    connection.query("SELECT * FROM cart WHERE user_id=" + user.id + " AND product_id=" + req.params.id, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        if (result[0]) {
          connection.query("UPDATE cart SET amount = amount+" + req.body.amount + " WHERE user_id=" + user.id + " AND  product_id=" + req.params.id, (err, result, fields) => {
            if (err) {
              console.log(err.message);
            } else {
              res.redirect('/cart');
            }
          })
        } else {
          connection.query('INSERT INTO cart (user_id,product_id,amount,create_time) VALUES(?,?,?,?)', [user.id, req.params.id, req.body.amount, time,], (err, result, fields) => {
            if (err) {
              console.log(err.message);
            } else {
              res.redirect('/cart');
            }
          })
        }
      }
    })
  }
});

module.exports = router;