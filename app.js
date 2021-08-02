var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');

const mongoSanitize = require("express-mongo-sanitize");

const dotenv = require('dotenv').config();


// var productsRouter = require('./routes/products2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// to replace prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(

  require("express-session")({

    secret: "yshsytdert%4^&jaghasfsS",

    resave: true,

    saveUninitialized: true,

  })

);

var mongoose = require('mongoose');

//Get connection
mongoose.connect(process.env.MONGO_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
/// To log the Mongoose erros to the console directly
db.on("error", console.error.bind(console, "connection error:"));



var uniqueValidator = require('mongoose-unique-validator');



// -------------------------------------------------------------
// For Passport.js
require("./my-passport").init(app);
// -------------------------------------------------------------

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact', contactRouter);



// app.use('/products', productsRouter);

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
