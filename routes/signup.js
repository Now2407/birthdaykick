var route = require("express");
var user = require('../models/users');
var nodemailer = require("nodemailer");

var routes = route.Router();

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "<your gmail email>",
        pass: "<your gmail password>"
    }
});

routes.get('/signup', function(req, res){
    
    res.render('../views/signup.ejs');
    
});


routes.post('/signup', function(req, res){
    
    var e = req.body.email;
    var p = req.body.password;
    var re = req.body.retypepassword;
    var coname = req.body.coname;
    
    

    
    if (p == re) {
        
        user.findOne({"email": req.body.email}, function(err, myuser){
            
            
            if (myuser) {
                
                res.send("email taken! please login");
                
            }else{
                
                
                 var User = user({
                    email: e,
                    password: p,
                    coname: coname,
                    activated: 0
                });
                 
                  User.save(function(error, you){
                    
                    if (error){
                        console.log("error");
                    }else{
                        
                        var txt = "click to activate: http://localhost:8080/actiavte?id="+you._id +"&email="+ you.email;
                            
                            var mailopts = {
                                
                                from: "activate",
                                to: you.email,
                                subject: "actiavte birthday kick account",
                                html: txt
                                
                                
                            }
                            
                            smtpTransport.sendMail(mailopts, function(aerror, info){
                                if (aerror) {
                                    console.log(aerror);
                                }else{
                                    res.send("check your inbox " + you.email);
                                }
                            });
                        
                        
                    }
                    
                  });
           
            
               
            }
            
            
            
        });
        
    
    }
    
});

module.exports = routes;