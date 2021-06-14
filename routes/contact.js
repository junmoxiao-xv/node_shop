var express = require('express');
var router = express.Router();
var connection = require('./conmysql');
var sd = require('silly-datetime');
let time = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');


router.get('/', function (req, res) {
  let user = req.session.user;
  if (user == undefined) {
    res.redirect('/login');
  } else {
    connection.query('SELECT buyform.id,product_img,product_name,amount, amount*price total_price,fname,address,status FROM product INNER JOIN address INNER JOIN buyform ON buyform.product_id=product.id AND buyform.user_id =' + user.id +' ORDER BY buyform.id DESC', (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        data = result;
        connection.query('SELECT COUNT(*) amount FROM cart WHERE user_id=' + user.id, (err, result, fields) => {
          if (err) {
            console.log(err.message);
          } else {
            data2 = result;
            res.render('contact', {
              list: data,
              obj: data2[0].amount
            });
          }
        })
      }
    })
  }
});

router.delete('/del/:id', (req, res) => {
  connection.query('DELETE FROM buyform WHERE id=' + req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render('contact', {
        list: data,
        obj: data2[0].amount
      });
    }
  });
});

router.post('/receipt/:id', (req, res) => {
  let user = req.session.user;
  connection.query('UPDATE buyform SET status="已收货" WHERE user_id=' + user.id + ' AND  id='+req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      res.redirect('/contact')
    }
  })
});

module.exports = router;