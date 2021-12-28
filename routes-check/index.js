//Written by Mohammadmehdi Noroozi(Mehdi)

var express = require('express');
var router = express.Router();
// const getPackages = require("../models/packagesMdl").getPackages;
var { Package } = require("../models/packagesMdl");
var random_greeting = require('../models/greeting');
let greeting = ['Hello', 'How are you', 'Hi', 'Greetings', 'Hola'];

router.get('/gallery', function(req, res, next) {
    res.render('gallery')

});

router.get('/thankyou', function(req, res, next) {
    res.render('thankyou')

});



router.get('/contact', function(req, res, next) {
    res.render('contact-form');
});

router.get('/packages', function(req, res, next) {
    res.render('packages');
});

router.get('/cancellation', function(req, res, next) {
    res.render('cancellation');
});

//show all packages
router.get('/', function(req, res, next) {
    Package.find({}, (err, packages) => {

        res.render('index', { title: "Our Packages", packageList: packages, dt: (new Date()).toString(), greet: random_greeting(greeting) });
        // console.log(packages)
    });
});

//show single packages
router.get('/package-single/:id', function(req, res, next) {
    const pid = req.params.id;

    Package.findOne({ PackageId: pid }, (err, package) => {

        res.render('package-single', {
            packageList: package

        });
        // console.log(packages)
    });

});

//show single packages

router.get('/package-buy/:id', function(req, res, next) {
    if (!req.user) {
        res.redirect("/users/login");
        res.redirect("/");
    }
    console.log(req.user);
    // console.log(currentUser.CustomerId);
    const pid = req.params.id;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    Package.findOne({ PackageId: pid }, (err, package) => {
        res.render('package-buy', {
            packageList: package,
            curdt: today,
            cid: Number(req.user.CustomerId)
        });
        // console.log(packages)
    });
});

module.exports = router;