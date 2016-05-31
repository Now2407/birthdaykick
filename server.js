var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var home = require('./routes/home.js');
var login = require('./routes/login.js');
var signup = require('./routes/signup.js');
var activate = require('./routes/activate.js');
var session = require('client-sessions');
var Liquid = require("liquid-node");
var nodemailer = require("nodemailer");




var engine = new Liquid.Engine

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;



app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));




app.use('/', home);
app.use('/', login);
app.use('/', signup);
app.use('/', activate);


app.get('/dashboard', function(req, res){
    
    if (req.session.email && req.session) {
        res.send('dashboard <a href="/logout">logout</a>');
     
    }else{
        res.redirect('/login');
    }
    
    
    
});

app.get('/logout', function(req, res){
    req.session.reset();
    res.redirect('/login');
});



app.listen(port);

