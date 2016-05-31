var route = require("express");
var user = require('../models/users');


var routes = route.Router();

routes.get('/login', function(req, res){
    
        var message = req.query.msg;

    if (req.session.email && req.session) {
        res.redirect('/dashboard');
    }else{
            res.render('../views/login.ejs', {msg: message});

    }
    
});

routes.post('/login', function(req, res){
    
    var email = req.body.email;
    var password = req.body.password;
                   
    var msg = req.body.msg;
    
        
      
    user.findOne({email: email, password: password}, function(err, us){
        if (err){
        res.send("err!" + err);
        }else{
                
                if (!us) {
                        res.send("no user found! email or password is wrong!");
                }else{
                if (us.activated == 1) {
                        req.session.email = us.email;
                        req.session.id = us._id;
                        res.redirect("/dashboard");
                }else if (us.activated == 0) {
                   res.render('../views/login.ejs', {msg: "you are not actiavted! check your email!"});

                }
                }
        }
        
    });
    
    
    
    
});


module.exports = routes;