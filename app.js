const express = require('express');
const mysql = require('mysql');
var flash    = require('connect-flash');
var validator = require('express-validator');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var admin = require('./routes/admin');
const cors = require('cors');


app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views engine', 'ejs')
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
app.use(flash());
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.messages = req.flash('messages');
    next();
  })
var con = mysql.createConnection({
    host: "localhost",
    user: "id3448928_phanqui",
    password: "a0633603577",
    database: "id3448928_raubb"
  });

con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
});
// Make our db accessible to our router
app.use(function(req,res,next){
    req.con = con;
    next();
});


app.use('/admin', admin);
app.use(express.static(__dirname + '/client/dist/'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  });
app.listen('8080' , () =>{
    console.log('port 8080');
})