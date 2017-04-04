var express = require('express');
var router = express.Router();
var fb = require('fb');
var config = require('../config');
var Group = require('../models/group');

/* return all groups */
router.get('/', function(req, res, next) {
  Group.find({}, function (err, groups) {
    res.format({
      'text/html': function(){
        res.render('index');
      },

      'application/json': function(){
        res.send(groups);
      },

      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

/* return a group */
router.get('/:id', function(req, res, next) {
  Group.findOne({ $or:[ { _id: req.params.id }, { slug: req.params.id } ] }, function (err, group) {
    res.format({
      'text/html': function(){
        res.render('index');
      },

      'application/json': function(){
        res.send(group);
      },

      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

/* return friends in a group */
router.get('/:id/friends', function(req, res, next) {
  Group.findOne({ $or:[ { _id: req.params.id }, { slug: req.params.id } ] })
  .populate('friends').exec(function (err, group) {
    res.format({
      'text/html': function(){
        res.render('index');
      },

      'application/json': function(){
        res.send(group.friends);
      },

      'default': function() {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

/* join a group */
router.post('/:id/me', function(req, res, next) {
  // find the group and populate friends
  Group.findOne({ $or:[ { _id: req.params.id }, { slug: req.params.id } ] })
  .populate('friends').exec(function (err, group) {
    if (err) return next(err);
    
    group.friends.push({ _id: req.user._id });

    group.save(function (err) {
      if (err) return next(err);
      res.status(200).send('OK');
    });
  });
});

/* quit a group */
router.delete('/:id/me', function(req, res, next) {
  // find the group and populate friends
  Group.findOne({ $or:[ { _id: req.params.id }, { slug: req.params.id } ] })
  .populate('friends').exec(function (err, group) {
    if (err) return next(err);
    
    group.friends.pull({ _id: req.user._id });
    
    group.save(function (err) {
      if (err) return next(err);
      res.status(200).send('OK');
    });
  });
});

/* create a new group from a facebook group */
router.post('/', function(req, res, next) {

  fb.options({
    version: 'v2.8',
    appId: config.facebook.app_id,
    appSecret: config.facebook.app_secret
  });

  fb.setAccessToken(req.user.facebookToken);

  // parse id or username of group from url
  var regex = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:groups\/)?([\w\-\.]*)?/;
  var id = regex.exec(req.body.url)[1];

  if (parseInt(id)) {
    // if id is already numeric id, like '128729374293', use the basic get api
    fb.api(id, {fields: ['id', 'name']}, function (res2) {
      if(!res2 || res2.error) {
        console.log(!res2 ? 'error occurred' : res2.error);
        var err = new Error('Invalid URL');
        err.status = 422;
        next(err);
      } else {
        Group.findOrCreate({ facebookId: res2.id }, function (err, group) {
          if (!group.name) {
            group.name = res2.name;
            group.save();
          }
          res.redirect('/groups/' + group.id);
        });
      }
    });
  } else {
    // if id is a username string, like 'avaruskatu', we have to use search api
    fb.api('search', {q: id, type: 'group', fields: ['id', 'name']}, function (res2) {
      if(!res2 || res2.error || !res2.data.length) {
        console.log(!res2 ? 'error occurred' : res2.error);
        var err = new Error('Invalid URL');
        err.status = 422;
        next(err);
      } else {
        Group.findOrCreate({ facebookId: res2.data[0].id }, function (err, group) {
          if (!group.name) {
            group.name = res2.data[0].name;
            group.save();
          }
          res.redirect('/groups/' + group.id);
        });
      }
    });
  }

});

module.exports = router;
