var express = require('express');
var router = express.Router();
var connection = require('./conmysql')


let show_sql = 'SELECT product.id,product_img,product_name,category_name,details,price,sales_count,inventory,product.create_time FROM product INNER JOIN classify  ON product.classify_id = classify.id';
let data = new Array();

//数据展示
router.get('/', function (req, res) {
  connection.query(show_sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
    }
  });
  res.render('table1', {
    list: data
  });
});

//删除
router.delete('/del/:id', (req, res) => {
  connection.query('DELETE FROM product WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      connection.query(show_sql, (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          data = JSON.parse(JSON.stringify(result));
        }
      });
      res.render('table1', {
        list: data
      });
    }
  });
});

//新增页面
router.get('/addpage', (req, res) => {
  res.render('add');
});

//新增
router.post('/add', (req, res) => {
  connection.query('SELECT id FROM classify WHERE category_name=?', [req.body.category_name], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      classify_id = JSON.parse(JSON.stringify(result));
      connection.query('INSERT INTO product (product.classify_id,product.product_name,product.details,product.price,product.sales_count,product.inventory) VALUES(?,?,?,?,?,?)', [classify_id[0].id, req.body.product_name, req.body.details, req.body.price, req.body.sales_count, req.body.inventory], (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          res.redirect('/table1');
        }
      });
    }
  });
});

//修改页面
router.get('/chapage/:id', (req, res) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == req.params.id) {
      res.render('cha', {
        obj: data[i]
      });
    }
  }
});


//修改
router.post('/cha', (req, res) => {
  connection.query('SELECT id FROM classify WHERE category_name=?', [req.body.category_name], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      let classify_id = JSON.parse(JSON.stringify(result));
      connection.query('UPDATE product SET product_name=?,product.classify_id=?,product.details=?,product.price=?,product.sales_count=?,product.inventory=? WHERE product.id=?', [req.body.product_name, classify_id[0].id, req.body.details, req.body.price, req.body.sales_count, req.body.inventory, req.body.id], (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          res.redirect('/table1');
        }
      })
    }
  })
});

//查询
router.post('/search',(req,res) => {
  product_name = req.body.product_name;
  category_name = req.body.category_name;
  sql = show_sql;
  if(product_name){
    sql += " and product_name like'%" + product_name + "%' ";
  }
  if(category_name){
    sql += " and category_name like'%" + category_name + "%' ";
  }
  sql = sql.replace("and","where");
  connection.query(sql,(err,result,fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('table1',{
        list:result
      });
    }
  })
});


module.exports = router;