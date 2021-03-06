var router = require('express').Router();
var Group = require('../models/group');
var Friend = require('../models/friend');
var auth = require('../middlewares/auth');

/* get me */
router.get('/', function(req, res, next) {
  res.format({
    'text/html': function(){
      res.render('index');
    },

    'application/json': function(){
      if (req.user) {
        Friend.findById(req.user._id).populate('groups things').exec(function (err, me) {
          res.json(me);
        });
      } else {
        res.json();
      }
    },

    'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    }
  });
});

// share a thing
router.post('/things', auth, function (req, res, next) {
  req.user.update({ $addToSet: { things: req.body._id } }, function (err, friend) {
    if (err) return next(err);
    res.json({succeed: true});
  });
});

// unshare a thing
router.delete('/things/:id', auth, function (req, res, next) {
  req.user.update({ $pull: { things: req.params.id } }, function (err, friend) {
    if (err) return next(err);
    res.json({succeed: true});
  });
});

module.exports = router;
