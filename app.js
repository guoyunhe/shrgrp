var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');
var dburi = require('./database').uri;
var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var groups = require('./routes/groups');

var Friend = require('./models/friend');

var app = express();

mongoose.connect(dburi);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(Friend.authenticate()));
passport.use(
  new FacebookStrategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, callback) {
    Friend.findOrCreate({ facebookId: profile.id }, function (err, friend) {
      friend.facebookToken = accessToken;
      friend.save();
      return callback(err, friend);
    });
  })
);
//passport.serializeUser(Friend.serializeUser());
//passport.deserializeUser(Friend.deserializeUser());
passport.serializeUser(function(friend, done) {
  done(null, friend.id);
});
passport.deserializeUser(function(id, done) {
  Friend.findById(id, function(err, friend) {
    done(null, friend);
  });
});

// Load routes
app.use('/', index);
app.use('/users', users);
app.use('/groups', groups);
app.use('/auth', auth);

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
