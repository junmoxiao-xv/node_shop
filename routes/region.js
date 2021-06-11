var express = require('express');
const connection = require('./conmysql');
var router = express.Router();

router.get('/:id', function (req, res) {
    let user = req.session.user;
    if (user == undefined) {
        connection.query('SELECT id,product_name,product_img,price,intro FROM product WHERE classify2_id = ' + req.params.id, (err, result, fields) => {
            if (err) {
                console.log(err.message);
            } else {
                data = result;
                res.render('region', {
                    list: data,
                    obj: 0
                });
            }
        })
    } else {
        connection.query('SELECT id,product_name,product_img,price,intro FROM product WHERE classify2_id = ' + req.params.id, (err, result, fields) => {
            if (err) {
                console.log(err.message);
            } else {
                data = result;
                connection.query('SELECT COUNT(*) amount FROM cart WHERE user_id=' + user.id, (err, result, fields) => {
                    if (err) {
                      console.log(err.message);
                    } else {
                        data2 = result;
                      res.render('region', {
                        list: data,
                        obj: data2[0].amount
                      });
                    }
                  })
            }
        })
    }
});

module.exports = router;