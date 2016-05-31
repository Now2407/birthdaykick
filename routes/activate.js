var route = require("express");
var user = require('../models/users');


var routes = route.Router();

routes.get('/actiavte', function(req, res){
    
    
    
    var email = req.query.email;
    var uid = req.query.id;
    
    user.findOne({_id: req.query.id}, function(err, hiuser){
        
        if (err) throw err;
        
        
        if (hiuser.activated == 0) {
            
            hiuser.activated = 1;
            
            hiuser.save(function(merr){
                if (!merr) {
                    res.redirect('/login?msg=you are now actiavted!');
                }else{
                    res.send("error!");
                }
            });
        }else{
            res.redirect('/login?msg=you are already activated! ');
        }
        
    });
    
});




module.exports = routes;