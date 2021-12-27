//Written by Mohammadmehdi Noroozi(Mehdi)

var express = require('express');
var router = express.Router();

const Contact = require('../models/contactMdl').Contact;


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });//

//show all contacts
router.get('/display-contact', function (req, res, next) {
  Contact.find((err, contacts) => {
    
    res.render('display-contact', { contactForms: contacts });
    // console.log(contacts)
  });
});

//show a single contact
router.get('/display-contact/:purl', function(req, res, next) {
  const cnurl = req.params.purl;

  Contact.findOne({email: cnurl},(err, contacts) => {
    
    res.render('display-single-contact', { contactForm: contacts });
    console.log(contacts)
  });
 
});


router.get('/', function(req, res, next) {
  res.render('contact-form');
});

router.get('/thankyou', function(req, res) {
  const fname = req.session.fname;
  req.session.fname = null;

  res.render('thankyou', {fname});
});


// To create a new contact
router.post('/', function (req, res, next) {
  const post = new Contact(req.body);

  post.save(err => {
    // if(err) throw err;
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("contact-form", {
        contactdata: req.body,
        errors: errorArray
      });
    } 
    req.session.fname = req.body.name

    res.redirect("/contact/thankyou");


  });
});

module.exports = router;


