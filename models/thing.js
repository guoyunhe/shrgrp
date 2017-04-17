var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('mongoose-url-slugs');

var Thing = new Schema({
  name: {type: String, default: '', trim: true},
  cat: {type: String, default: 'other', enum: ['tools', 'kitchen', 'sports', 'party', 'other']},
  icon: String,
  published: {type: Boolean, default: false},
  friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
});

Thing.plugin(slug('name', {update: true}));

module.exports = mongoose.model('Thing', Thing);
