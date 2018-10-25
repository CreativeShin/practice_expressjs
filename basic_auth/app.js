const express = require('express');
const bodyParser = require('body-parser');
const User = require('./schemas/userschema');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/AuthDB', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database!');
});

const app = express();
const port = process.env.PORT || 3000;

//  SET

app.set(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//  MIDDLEWARES

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
    }
  }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret:'auth example',
    resave:true,
    saveUninitialized:false
}));

// app.use(requiresLogin);

//  ROUTES

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/logout', (req, res)=>{
    if(req.session){
        req.session.destroy(err =>{
            if(err) return next(err);
            res.redirect('/signin');
        }); 
    }
});

app.get('/secret', requiresLogin ,(req, res)=>{
    res.send('Secret');
})

app.get('/signin', (req, res)=>{
    res.render('signin');
});

app.get('/profile', requiresLogin,(req, res) => {
    res.send('Gone with the wind...');
});

app.post('/signin', (req, res)=>{
    if(req.body.username && req.body.password){
        var username = req.body.username;
        var password = req.body.password;
        User.authenticate(username, password, function(err,user){
            if(err){
                console.log(err);
                res.redirect('/');
            }else{
                console.log('STORING SESSION!',user)
                req.session.userId = user._id;
                res.redirect('/secret');
            }
        });
    }
})

app.post('/auth', (req, res) => {
    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }
        
       var newUser = new User(userData);
        newUser.save((err, user)=>{
            if(!user){
                console.log(err);
                res.redirect('/');
            }else{
                console.log(user.username, user.email);
                res.redirect('/profile');
            }
        });
    }
});

app.listen(port, () => {
    console.log(`listeing on port ${port}`);
})