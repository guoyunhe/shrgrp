var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var slug = require('mongoose-url-slugs');

var Group = new Schema({
  name: {type: String, default: '', trim: true},
  facebookId: String,
  cover: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
});

Group.plugin(findOrCreate);
Group.plugin(slug('name', {update: true}));

module.exports = mongoose.model('Group', Group);
