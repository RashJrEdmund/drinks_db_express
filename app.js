var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this is a simulation of api keys stored in some database

const API_KEYS = ["1", "2", "3", "4", "5"];

// this is a middle-ware that make sures u have an api key. read middle wares

app.use(function (req, res, next) {
  const {apikey}  = req.query;
  const key = req.get("x-api-key");
  if(API_KEYS.includes(apikey) || API_KEYS.includes(key)) { // the second option is to check the x-api-key value on postman header section
    next(); // this calls the next function to be ran
  } else {
    res.send("acces denied").statusCode(403); // this like the res.status(403) error codes
  }
});

// middle ware ends here

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
