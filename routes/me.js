var router = require('express').Router();
var Group = require('../models/group');
var Friend = require('../models/friend');

/* get me */
router.get('/', function(req, res, next) {
  res.format({
    'text/html': function(){
      res.render('index');
    },

    'application/json': function(){
      res.send(req.user);
    },

    'default': function() {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    }
  });
});

module.exports = router;
