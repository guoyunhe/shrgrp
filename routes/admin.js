var router = require('express').Router();
var admin = require('../middlewares/admin');

router.use(admin);

router.get('/', admin, function(req, res, next) {
  res.render('index');
});

module.exports = router;
