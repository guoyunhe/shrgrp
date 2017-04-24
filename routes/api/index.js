var router = require('express').Router();

/**
 * load api routes of different versions
 */
router.use('v1.0', require('./v1.0/index'));

module.exports = router;
