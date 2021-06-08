var express = require('express');
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
        connection.query('SELECT product_name,price*amount sum_price,amount FROM product LEFT JOIN cart ON product.id = product_id WHERE user_id = ' + user.id, (err, result, fields) => {
          if (err) {
            console.log(err.message);
          } else {
            res.render('checkout', {
              list: result,
              obj: data[0]
            });
          }
        })
      }
    })

  }

});

module.exports = router;