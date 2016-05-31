var db = require('../config/db.js');
var mongoose = require("mongoose");
var customerSchema = db.Schema({
    
    
    birthday: Date,
    firstname: String,
    lastname: String,
    email: String,
    age: String,
    country: String,
    gender: Number
    
    
    
});

var customer = mongoose.model('Customer', customerSchema);

module.exports = customer;