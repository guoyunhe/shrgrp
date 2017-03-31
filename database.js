/* Generate MongoDB connection URL */

var config = require('./config');

module.exports = {
    uri: 'mongodb://' + config.mongodb.username + ':' + encodeURIComponent(config.mongodb.password)
        + '@' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database
};
