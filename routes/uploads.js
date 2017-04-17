var router = require('express').Router();
var multer = require('multer');
var path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

var config = require('../config');
var Thing = require('../models/thing');

var uploadPath = path.join(__dirname, '..', 'uploads');

var upload = multer({
  storage: multer.diskStorage({
    destination: uploadPath,
    /**
     * file name: unix time stamp + file extension
     */
    filename: function (req, file, cb) {
      switch (file.mimetype) {
        case 'image/jpeg':
          cb(null, Date.now() + '.jpg');
          break;
        case 'image/png':
          cb(null, Date.now() + '.png');
        case 'image/svg+xml':
          cb(null, Date.now() + '.svg');
      }
    }
  }),
  /**
   * allowed formats: jpeg, png and svg
   */
  fileFilter: function (req, file, cb) {
    const isAllowed = file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml';
    cb(null, isAllowed);
  }
});

/* upload files */
router.post('/', upload.single('file'), function (req, res, next) {
  if (req.file) {
    imagemin([req.file.path], uploadPath, {
      plugins: [
        imageminJpegtran(),
        imageminPngquant({quality: '65-80'}),
        imageminSvgo()
      ]
    }).then(files => {
      res.send({
        filename: req.file.filename,
        path: '/uploads/' + req.file.filename,
        url: config.url + '/uploads/' + req.file.filename
      });
    });
  } else {
    res.status(400).send({ message: 'invalid file. make sure file format is correct. (.jpg, .png or .svg)' });
  }
});

module.exports = router;
