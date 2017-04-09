var router = require('express').Router();
var Thing = require('../models/thing');

/* list all things */
router.get('/', function (req, res, next) {
  res.format({
    'text/html': function(){
      res.render('index');
    },
    'application/json': function(){
      Thing.find({}, function (err, things) {
        res.send(things);
      })
    },
    'default': function() {
      res.status(406).send('Not Acceptable');
    }
  });
});

/* create a new thing */
router.post('/', function (req, res, next) {
  var thing = new Thing({
    name: req.body.name,
    cat: req.body.cat,
    icon: req.body.icon,
    published: req.body.published
  });
  thing.save(function (err) {
    if (err) return next(err);
    res.send(thing);
  })
});

/* show one thing */
router.get('/:id', function (req, res, next) {
  res.format({
    'text/html': function(){
      res.render('index');
    },
    'application/json': function(){
      Thing.findById(req.params.id, function (err, thing) {
        res.send(thing);
      })
    },
    'default': function() {
      res.status(406).send('Not Acceptable');
    }
  });
});

/* update a thing */
router.patch('/:id', function (req, res, next) {
  Thing.findById(req.params.id, function (err, thing) {
    if (req.body.name) thing.name = req.body.name;
    if (req.body.cat) thing.cat = req.body.cat;
    if (req.body.icon) thing.icon = req.body.icon;
    if (req.body.published) thing.published = req.body.published;

    thing.save(function (err) {
      if (err) return next(err);
      res.send(thing);
    })
  });
});

/* delete a thing */
router.delete('/:id', function (req, res, next) {
  Thing.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send();
  })
});

module.exports = router;
