var db = require("mongoose");

db.connect('mongodb://localhost:27017/bapp');
    
module.exports = db;
    
    
