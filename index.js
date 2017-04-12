
var express = require("express");
var path = require('path');
var app = express();
app.use(express.static(__dirname + '/public'));

//passport
var passport = require('passport');
require('./server/config/passport')(passport); // pass passport for configuration

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({
    secret: 'this is the secret'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

// routes ======================================================================
require('./server/routes/auth.js')(app, passport);

pdtls = require('./server/projectdtls');


app.get('/pstatus', pdtls.getprojectstatus);

app.use('/scripts', express.static(__dirname + '/node_modules/'));

port = process.env.PORT || 8000;

app.listen(port);
