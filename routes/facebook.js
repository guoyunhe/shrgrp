/* Route for Facebook login. This is the only login option for now. */

var router = require('express').Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

var config = require('../config');
var Friend = require('../models/friend');

passport.use(
    new Strategy({
        clientID: config.facebook.app_id,
        clientSecret: config.facebook.app_secret,
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, callback) {
        Friend.findOrCreate({ facebookId: profile.id }, function (err, friend) {
            return callback(err, friend);
        });
    })
);

passport.serializeUser(function(friend, done) {
  done(null, friend.id);
});

passport.deserializeUser(function(id, done) {
  Friend.findById(id, function(err, friend) {
    done(null, friend);
  });
});

// Define routes.
router.get('/', passport.authenticate('facebook'));

router.get(
    '/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        req.login(req.user, function(err){
            if(err) return next(err);
            res.redirect('/');
        });
    }
);

module.exports = router;
