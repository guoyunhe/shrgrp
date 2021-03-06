var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fb = require('fb');
var _ = require('underscore');
var config = require('../config');
var Group = require('../models/group');

/* return all groups */
router.get('/', function (req, res, next) {
  Group.find({}, function (err, groups) {
    res.format({
      'text/html': function () {
        res.render('index');
      },

      'application/json': function () {
        res.json(groups);
      },

      'default': function () {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    });
  });
});

/* return a group */
router.get('/:id', function (req, res, next) {
  res.format({
    'text/html': function () {
      res.render('index');
    },

    'application/json': function () {
      var query;
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        query = Group.findById(req.params.id);
      } else {
        query = Group.findOne({ slug: req.params.id });
      }
      query.populate({ path: 'friends', populate: { path: 'things' } }).exec(function (err, group) {
        res.json(group);
      });
    },

    'default': function () {
      res.status(406).send('Not Acceptable');
    }
  });
});

/* join a group */
router.post('/:id/me', function (req, res, next) {
  Group.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.user._id } }, function (err, group) {
    if (err) return next(err);

    req.user.update({ $addToSet: { groups: group._id } }, function (err, friend) {
      if (err) return next(err);
      res.json(req.user);
    });
  });
});

/* quit a group */
router.delete('/:id/me', function (req, res, next) {
  Group.findByIdAndUpdate(req.params.id, { $pull: { friends: req.user._id } }, function (err, group) {
    if (err) return next(err);

    req.user.update({ $pull: { groups: group._id } }, function (err, friend) {
      if (err) return next(err);
      res.json(req.user);
    });
  });
});

/* create a new group */
router.post('/', function (req, res, next) {

  if (req.body.url) {
    /**
     * from a facebook group url
     */

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
      fb.api(id, { fields: ['id', 'name'] }, function (res2) {
        if (!res2 || res2.error) {
          console.log(!res2 ? 'error occurred' : res2.error);
          var err = new Error('Invalid URL');
          err.status = 422;
          next(err);
        } else {
          Group.findOrCreate({ facebookId: res2.id }, function (err, group) {
            if (!group.name) {
              group.name = res2.name;
              group.save(function (err, group) {
                res.json(group);
              });
            } else {
              res.json(group);
            }
          });
        }
      });
    } else {
      // if id is a username string, like 'avaruskatu', we have to use search api
      fb.api('search', { q: id, type: 'group', fields: ['id', 'name'] }, function (res2) {
        if (!res2 || res2.error || !res2.data.length) {
          console.log(!res2 ? 'error occurred' : res2.error);
          var err = new Error('Invalid URL');
          err.status = 422;
          next(err);
        } else {
          Group.findOrCreate({ facebookId: res2.data[0].id }, function (err, group) {
            if (!group.name) {
              group.name = res2.data[0].name;
              group.save(function (err, group) {
                res.json(group);
              });
            } else {
              res.json(group);
            }
          });
        }
      });
    }

  } else {
    /**
     * from form data
     */
    var data = _.pick(req.body, 'name', 'desc', 'cover', 'facebookId', 'city');
    var group = new Group(data);
    group.save(function (err, group) {
      res.json(group);
    });
  }

});

// update a group (patch)
router.patch('/:id', function (req, res, next) {
  /**
   * note: use save() instead of update() or findByIdAndUpdate().
   * otherwise, slug won't be updated. update() is directly database
   * operation that doesn't call any plugin pre, post events.
   */
  Group.findById(req.params.id, function (err, group) {
    if (err) return res.status(404).send('not found');
    var data = _.pick(req.body, 'name', 'desc', 'cover', 'facebookId', 'city');
    group = _.extend(group, data);
    group.save(function (err, group) {
      res.json(group);
    });
  });
});

// delete a group
router.delete('/:id', function (req, res, next) {
  Group.findByIdAndRemove(req.params.id, function (err, group) {
    if (err) return next(err);

    res.json({ succeed: true });
  });
});

module.exports = router;
