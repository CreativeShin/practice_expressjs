const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

//  AUTH
router.route('/logout')
    .get((req,res)=>{
        req.session.destroy();
        res.redirect('/');
    })

router.route('/')
    .get((req, res) => {
        res.render('login');
    });

router.route('/')
    .post((req, res) => {
        //handle authentication
        var admin = {
            _id: req.body._id,
            username: req.body.username,
            password: req.body.password
        }

        Admin.authenticate(admin.username, admin.password, (err, admin)=>{
            if(!admin){
                return res.status(401).send("User not found!");            
            }else if(err){
                return res.status(400).send("Something went wrong.");
            }else{
                req.session.userId = admin._id;
                return res.redirect('/new');
            }

        })
    });

//  REG ONE

router.route('/admin')
    .post((req, res) => {
        var admin = {
            username: 'administrator',
            password: 'medium'
        }

        var newAdmin = new Admin(admin);

        newAdmin.save((err, admin)=>{
            console.log(admin.username);
            res.send('Admin Created!');
        });
    });



module.exports= router;