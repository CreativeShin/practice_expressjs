const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const rootRoute = require('./routes/rootRoute');
const authRoute= require('./routes/authRoute');

const app = express();
const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017/linkLogger';

//  MONGOOSE

mongoose.connect(url,{
    useNewUrlParser: true
});

//  SET

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret:'bestlogger',
    resave:true,
    saveUninitialized:false
}));
app.use('/', rootRoute);
app.use('/auth', authRoute)

//  LISTEN

app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
});