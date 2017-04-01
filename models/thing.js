var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('mongoose-url-slugs');

var Thing = new Schema({
  name: String
});

Thing.plugin(slug('name'));

module.exports = mongoose.model('Thing', Thing);
