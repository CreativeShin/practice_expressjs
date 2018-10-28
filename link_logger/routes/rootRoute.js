const express = require('express');
const router = express.Router();

const Log = require('../models/log');
const Admin = require('../models/admin');
const isLoggedIn = require('../middleware').isLoggedIn;

router.route('/')
    .get((req, res) => {
        Log.find({})
            .then(logs => {
                console.log(logs);
                res.render('index', { logs });
            })
            .catch(err => {
                res.status(401).send('ERROR!');
            });

    });

router.get('/new', isLoggedIn, (req, res) => {
        res.render('new');
    });

router.route('/')
    .post((req, res) => {
        var log = {
            name: req.body.name,
            link: req.body.link,
            desc: req.body.desc
        }

        var newLog = new Log(log);

        newLog.save()
            .then(log => {
                console.log(log)
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                res.status(400).send('Something went wrong!');
            });
    });




module.exports = router;