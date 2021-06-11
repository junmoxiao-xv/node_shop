var express = require('express');
const session = require('express-session');
const connection = require('./conmysql');
var router = express.Router();


router.get('/', function (req, res) {
  let user = req.session.user;
  if (user == undefined) {
    res.redirect('/login');
  } else {
    connection.query('SELECT IFNULL(SUM(price*amount),0) total_prices FROM product INNER JOIN cart ON product.id=cart.product_id AND user_id=' + user.id, (err, result, fields) => {
      if (err) {
        console.log(err.message);
      } else {
        data = result;
        connection.query('SELECT product.id pid,product_name,price*amount sum_price,amount FROM product LEFT JOIN cart ON product.id = product_id WHERE user_id = ' + user.id, (err, result, fields) => {
          if (err) {
            console.log(err.message);
          } else {
            data2 = result;
            res.render('checkout', {
              list: data2,
              obj: data[0]
            });
          }
        })
      }
    })
  }
});

router.post('/', (req, res) => {
  let user = req.session.user;
  connection.query('UPDATE address SET user_id=?,address=?,phone=?,fname=? WHERE id=1', [user.id, req.body.address, req.body.phone, req.body.fname], (err, result, fields) => {
    if (err) {
      console.log(err.message);
    } else {
      for(var i = 0;i<data2.length;i++){
        let pid = data2[i].pid;
        let amount = data2[i].amount;
        connection.query('INSERT INTO buyform (user_id,address_id,product_id,amount,remark) VALUES (?,?,?,?,?)',[user.id,1,pid,amount,req.body.ordernotes],(err, result, fields) => {
        if (err) {
          console.log(err.message);
        } else {
          
        }
      })
      }
    }
  })
});

module.exports = router;