var router = require('express').Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var SVGO = require('svgo');

var config = require('../config');
var Thing = require('../models/thing');

var svgUpload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.svg');
    }
  }),
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype === 'image/svg+xml');
  }
});

var svgo = new SVGO();

var svgMinify = function (filePath) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    svgo.optimize(data, function (result) {
      fs.writeFile(filePath, result.data);
    });
  });
};

/* upload svg */
router.post('/svg', svgUpload.single('file'), function (req, res, next) {
  if (req.file) {
    svgMinify(req.file.path); // this is full path
    res.send({
      filename: req.file.filename,
      path: '/uploads/' + req.file.filename,
      url: config.url + '/uploads/' + req.file.filename
    });
  } else {
    res.status(400).send({ message: 'invalid file. make sure your svg file is correct.' });
  }
});

module.exports = router;
