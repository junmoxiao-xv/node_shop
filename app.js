var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var aboutRouter = require('./routes/about');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout.js');
var contactRouter = require('./routes/contact');
var shopsingleRouter = require('./routes/shopsingle');
var shopRouter = require('./routes/shop');
var thankyouRouter = require('./routes/thankyou');

var User = require('./routes/bean/user');
const { Router } = require('express');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "123",
  cookie : {maxAge : 60000},
  resave : false,
  saveUninitialized : true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/about', aboutRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);
app.use('/shopsingle', shopsingleRouter);
app.use('/shop', shopRouter);
app.use('/thankyou', thankyouRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
