var express = require('express');
var router = express.Router();
var connection = require('./conmysql')


let show_sql = 'SELECT product.id,product_img,product_name,category_name,details,price,sales_count,inventory,product.create_time FROM product INNER JOIN classify INNER JOIN inventory ON product.classify_id = classify.id AND product.id = inventory.product_id';
let data = new Array();

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

router.get('/addpage', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  connection.query('SELECT id FROM classify WHERE category_name=?', [req.body.category_name], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      classify_id = JSON.parse(JSON.stringify(result));
      connection.query('INSERT INTO product (product.classify_id,product.product_name,product.details,product.price,product.sales_count) VALUES(?,?,?,?,?)', [classify_id[0].id, req.body.product_name, req.body.details, req.body.price, req.body.sales_count], (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          connection.query('SELECT id FROM product WHERE product_name=?', [req.body.product_name], (err, result, fields) => {
            if (err) {
              console.log(err.message);
            } else {
              product_name = JSON.parse(JSON.stringify(result));
              connection.query('INSERT INTO inventory (product_id,inventory) VALUES(?,?)', [product_name[0].id, req.body.inventory], (err, result, fields) => {
                if (err) {
                  console.log(err.message);
                } else {
                  res.redirect('/table1');
                }
              });
            }
          })
        }
      });
    }
  });
});

router.get('/chapage/:id', (req, res) => {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == req.params.id) {
      res.render('cha', {
        obj: data[i]
      });
    }
  }
});

router.post('/cha',(req,res) => {
  connection.query('SELECT id FROM product WHERE product_name=?', [req.body.product_name], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      let product_id = JSON.parse(JSON.stringify(result));
      connection.query('SELECT id FROM classify WHERE category_name=?', [req.body.category_name], (err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          let classify_id = JSON.parse(JSON.stringify(result));
          connection.query('UPDATE product SET product.classify_id=?,product.details=?,product.price=?,product.sales_count=? WHERE product.id=?', [classify_id[0].id, req.body.details, req.body.price, req.body.sales_count, product_id[0].id], (err, result, fields) => {
            if (err) {
              console.log(err.message);
            } else{
              connection.query('SELECT id FROM inventory WHERE product_id=' + product_id[0].id, (err, result, fields) => {
                if (err) {
                  console.log(err.message);
                } else{
                  inventory_id = JSON.parse(JSON.stringify(result));
                  connection.query('UPDATE inventory SET product_id=?,inventory=? WHERE inventory.id=?',[product_id[0].id,req.body.inventory,inventory_id[0].id],(err, result, fields) => {
                    if (err) {
                      console.log('c', err.message);
                    } else {
                      res.redirect('/table1');
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})


module.exports = router;