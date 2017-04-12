/* Route for Facebook login. This is the only login option for now. */

var router = require('express').Router();
var passport = require('passport');
var redirect = require('../middlewares/redirect');

/**
 * facebook oauth
 */
router.get('/facebook', redirect.parse(), passport.authenticate('facebook'));

/**
 * facebook oauth callback
 */
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login'
  }),
  function (req, res, next) {
    req.login(req.user, function (err) {
      next(err);
    });
    next();
  },
  redirect.redirect()
);

router.post('/logout',  function (req, res, next) {
  req.logout();
  next();
});

module.exports = router;
