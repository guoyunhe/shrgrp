var express = require('express');
var router = express.Router();
var fb = require('fb');
var FBID = require('fb-id');
var fbid = new FBID();
var config = require('../config');
var Group = require('../models/group');

/* get users listing. */
router.get('/:id', function(req, res, next) {
  Group.findOne({id: req.params.id}, function (err, group) {
    res.render('group', group);
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
