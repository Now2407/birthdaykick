var route = require("express");

var routes = route.Router();

routes.get('/', function(req, res){
    
    res.render('../views/home.ejs');
    
});

module.exports = routes;