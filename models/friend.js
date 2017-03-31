var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var findOrCreate = require('mongoose-findorcreate')

var Friend = new Schema({
    username: String,
    password: String,
    facebookId: String
});

Friend.plugin(passportLocalMongoose);
Friend.plugin(findOrCreate);

module.exports = mongoose.model('Friend', Friend);
