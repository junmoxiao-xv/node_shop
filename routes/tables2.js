var express = require('express');
var router = express.Router();
const connection = require('./conmysql');

router.get('/', function (req, res) {
  connection.query('SELECT buyform.id,product_img,product_name,amount, amount*price total_price,fname,address,status,buyform.create_time create_time,remark,phone FROM product INNER JOIN address INNER JOIN buyform ON buyform.product_id=product.id  ORDER BY buyform.id DESC', (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      data = result;
      res.render('tables2', {
        list: data
      })
    }
  })
});

//修改页面
router.get('/chapage/:id', (req, res) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == req.params.id) {
      res.render('cha2', {
        obj: data[i]
      });
    }
  }
});

//修改
router.post('/cha', (req, res) => {
  connection.query('UPDATE address SET fname=?,phone=?,address=?', [req.body.fname, req.body.phone, req.body.address], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.redirect('/tables2');
    }
  })
});

module.exports = router;