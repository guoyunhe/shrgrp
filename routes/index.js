var router = require('express').Router();
var Group = require('../models/group');

/* GET home page. */
router.get('/', function(req, res, next) {
  Group.find({}, function (err, groups) {
    res.render('index', { title: 'shrgrp', me: req.user, groups: groups });
  });
});

module.exports = router;
