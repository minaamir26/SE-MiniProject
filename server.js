//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
var multer = require("multer");
var session = require("express-session");
var DB_URI = "mongodb://localhost:27017/profiles";
mongoose.connect(DB_URI);
var app = express();
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(path.join(__dirname,'public')));
app.set("views",path.resolve(__dirname,"views"));
app.set('view engine', 'ejs');

// configure app
app.use(flash());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+ '/public'));

//mongoose.connect(DB_URI);
app.use(router);


// start the server
app.listen(6225, function(){
    console.log("server is listening on port 8080");
})
