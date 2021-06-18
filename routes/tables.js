var express = require('express');
var router = express.Router();
var connection = require('./conmysql');
var sd = require('silly-datetime');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');

let show_sql = 'SELECT product.id,product_img,product_name,category_name,details,price,sales_count,inventory,product.create_time FROM product INNER JOIN classify  ON product.classify_id = classify.id';
let data = new Array();
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

//数据展示
router.get('/', function (req, res) {
  connection.query(show_sql + ' ORDER BY product.id DESC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = JSON.parse(JSON.stringify(result));
      res.render('tables', {
        list: data
      });
    }
  });
});

//删除
router.delete('/del/:id', (req, res) => {
  connection.query('DELETE FROM product WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('tables', {
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
  var form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, '../public/images')
  });
  form.parse(req, (err, fields, files) => {
    console.log(err);
    let newName = path.join(__dirname, '../public/images', files.pic.name);
    fs.rename(
      files.pic.path,
      newName,
      (err) => { console.log(err) }
    )
    connection.query('SELECT id FROM classify WHERE category_name=?', [fields.category_name], (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        let classify_id = result;
        let img_url = '/images/' + files.pic.name
        connection.query('INSERT INTO product (product.classify_id,product.product_name,product.details,product.price,product.sales_count,product.inventory,create_time,product_img) VALUES(?,?,?,?,?,?,?,?)', [classify_id[0].id, fields.product_name, fields.details, fields.price, fields.sales_count, fields.inventory, time, img_url], (err, result) => {
          if (err) {
            console.log(err.message);
          } else {
            res.redirect('/tables');
          }
        });
      }
    });
  })
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
  let img_url = '/images/' + req.body.pic;
  connection.query('SELECT id FROM classify WHERE category_name=?', [req.body.category_name], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      let classify_id = JSON.parse(JSON.stringify(result));
      connection.query('UPDATE product SET product_name=?,product.classify_id=?,product.details=?,product.price=?,product.sales_count=?,product.inventory=?,update_time=?,product_img=? WHERE product.id=?', [req.body.product_name, classify_id[0].id, req.body.details, req.body.price, req.body.sales_count, req.body.inventory, time, img_url, req.body.id], (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          res.redirect('/tables');
        }
      })
    }
  })
});

//查询
router.post('/search', (req, res) => {
  product_name = req.body.product_name;
  category_name = req.body.category_name;
  sql = show_sql;
  if (product_name) {
    sql += " and product_name like'%" + product_name + "%' ";
  }
  if (category_name) {
    sql += " and category_name like'%" + category_name + "%' ";
  }
  sql = sql.replace("and", "where");
  connection.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('tables', {
        list: result
      });
    }
  })
});


module.exports = router;