/* Route for Facebook login. This is the only login option for now. */

var router = require('express').Router();
var passport = require('passport');

// Define routes.
router.get('/facebook', passport.authenticate('facebook'));

router.get(
    '/facebook/callback',
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
