var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');
var dburi = require('./database').uri;
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
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
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
    function (accessToken, refreshToken, profile, callback) {
      Friend.findOrCreate({ facebookId: profile.id }, function (err, friend) {
        friend.facebookToken = accessToken;
        friend.name = profile.displayName;
        friend.save();
        return callback(err, friend);
      });
    })
);
//passport.serializeUser(Friend.serializeUser());
//passport.deserializeUser(Friend.deserializeUser());
passport.serializeUser(function (friend, done) {
  done(null, friend.id);
});
passport.deserializeUser(function (id, done) {
  Friend.findById(id, function (err, friend) {
    done(null, friend);
  });
});

// Load routes
app.use('/', require('./routes/index'));
app.use('/groups', require('./routes/groups'));
app.use('/things', require('./routes/things'));
app.use('/uploads', require('./routes/uploads'));
app.use('/me', require('./routes/me'));
app.use('/admin', require('./routes/admin'));
app.use('/about', require('./routes/about'));
app.use('/auth', require('./routes/auth'));

// 404 not found, let front-end do the job
app.get('/404', function (req, res) {
  res.status(404);
  res.format({
    'text/html': function () {
      res.render('index');
    },
    'application/json': function () {
      res.send({ message: 'not found' });
    },
    'default': function () {
      res.send('not found');
    }
  });
});
// redirect all unknown routes to 404
app.use(function (req, res, next) {
  res.redirect('/404');
});

// 403 permission denied, let front-end do the job
app.get('/403', function (req, res) {
  res.status(403);
  res.format({
    'text/html': function () {
      res.render('index');
    },
    'application/json': function () {
      res.send({ message: 'permission denied' });
    },
    'default': function () {
      res.send('permission denied');
    }
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
