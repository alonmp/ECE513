var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');     // Parses JSON in body

const cors = require('cors');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var customersRouter = require('./routes/customers');
var patientRouter = require('./routes/patient');
var apiRouter = require('./routes/api');

var app = express();

// This is to enable cross-origin access
app.use(cors({
  origin: '*',
  methods: ["GET","POST"],
  credentials: true
}
));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);
app.use('/customers', customersRouter);
app.use('/patient', patientRouter);
app.use('/api', apiRouter);

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

app.listen(3000);
module.exports = app;
