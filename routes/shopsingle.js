var express = require('express');
var router = express.Router();
var connection = require('./conmysql');

let show_sql = 'SELECT product.id,product_img,product_name,details,price,intro FROM product INNER JOIN classify  ON product.classify_id = classify.id';

// connection.query(catalog_sql, (err, result, fields) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     data2 = JSON.parse(JSON.stringify(result));
//   }
// });

//数据展示
// router.get('/', function (req, res) {
//   connection.query(show_sql, (err, result, fields) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       data = JSON.parse(JSON.stringify(result));
//       res.render('shop', {
//         list: data,
//         list2: data2
//       });
//     }
//   });

// });

// router.get('/:id', (req, res) => {
//   connection.query(show_sql + ' WHERE product.id!=' + req.params.id + ' LIMIT 5', (err, result, fields) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       row = JSON.parse(JSON.stringify(result));
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].id == req.params.id) {
//           res.render('shopsingle', {
//             obj: data[i],
//             list: row
//           });
//         }
//       }
//     }
//   });
// });

module.exports = router;