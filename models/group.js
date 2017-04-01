var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('mongoose-url-slugs');

var Group = new Schema({
  name: String,
  facebookId: String
});

Group.plugin(slug('name'));

module.exports = mongoose.model('Group', Group);
