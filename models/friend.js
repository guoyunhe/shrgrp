var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Thing = require('./thing');
var Group = require('./group');

var Friend = new Schema({
  facebookId: String,
  facebookToken: String,
  name: String,
  role: String, // admin: delete any groups, add and delete things
  things: [{ type: Schema.Types.ObjectId, ref: 'Thing' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }]
});

Friend.plugin(passportLocalMongoose);
Friend.plugin(findOrCreate);

// 320x320px avatar from Facebook
Friend.virtual('avatar').get(function () {
  return 'https://graph.facebook.com/' + this.facebookId + '/picture?type=square&width=320&height=320';
});

module.exports = mongoose.model('Friend', Friend);
