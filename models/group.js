var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var slug = require('mongoose-url-slugs');

var Group = new Schema({
  name: {type: String, default: '', trim: true},
  facebookId: String
});

Group.plugin(findOrCreate);
Group.plugin(slug('name'));

module.exports = mongoose.model('Group', Group);
