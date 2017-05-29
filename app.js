var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const join = require('path').join;
const fs = require('fs');
const ejs = require('ejs');

//实现模块热加载
const webpack=require('webpack');
const webpackConfig = require('./public/javascripts/webpack.config');
const compiler = webpack(webpackConfig);


// Bootstrap mongoose models
const models=join(__dirname, 'mongoose');

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));


// router
// const users = require('./routes/users.js');
const index = require('./routes/index.js');
const login = require('./routes/login.js');
const register = require('./routes/register.js');



var app = express();




//使用webpacl-dev-middleware
app.use(require("webpack-dev-middleware")(compiler,{
  publicPath:webpackConfig.output.publicPath
}));


//使用webpack-hot-middleware
app.use(require("webpack-hot-middleware")(compiler));



// view engine setup
app.engine('html',ejs.__express);
app.set('views', './views');
app.set('view engine','html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//路由

app.use('/index', index);
app.use('/login',login);
app.use('/register',register);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
