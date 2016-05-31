var db = require('../config/db.js');
var mongoose = require("mongoose");
var userSchema = db.Schema({

email: String,
password: String,
coname: String,
activated: Number
    
});

var user = mongoose.model('User', userSchema);

module.exports = user;