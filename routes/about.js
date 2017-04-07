var router = require('express').Router();

/* about page */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
