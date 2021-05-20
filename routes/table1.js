var express = require('express');
var router = express.Router();
var connection = require('./conmysql')


let show_sql = 'SELECT product_img,product_name,category_name,details,price,sales_count,inventory,product.create_time FROM product INNER JOIN classify INNER JOIN inventory ON product.classify_id = classify.id AND product.id = inventory.product_id';
let data = new Array();

router.get('/', function(req, res) {
  connection.query(show_sql,(err,result,fields) => {
    if(err){
      console.log(err.message);
    }else{
      data = JSON.parse(JSON.stringify(result));
    }
  });
  res.render('table1',{
    list:data
  });
});

module.exports = router;