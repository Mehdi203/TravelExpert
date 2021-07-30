var express = require('express');
var router = express.Router();
var random_greeting = require('../models/greeting');
let greeting = ['Hello', 'How are you', 'Hi', 'Greetings', 'Hola'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
                      dt:(new Date()).toString(),
                      greet:random_greeting(greeting),
                     });

  // res.render('index', { title: 'Express' });
});




router.get('/thankyou', function(req, res, next) { 
    res.render('thankyou')

});

router.get('/about', function(req, res, next) { 
  res.render('about')

});

router.get('/gallery', function(req, res, next) { 
  res.render('gallery')

});



// router.get('/registration', function(req, res, next) {
//   res.render('registration', {
//       firstname: "Mehdi",
//       lastname: "Noroozi",
//       email: "put203@yahoo.com",
//       password: "****",
//       repeatpass: "****"

//   });
// });

// router.get('/contact', function(req, res, next) {
//   res.render('contact', {
//       name: "Mehdi Noroozi",
//       email: "put203@yahoo.com",
//       subject: "Subject",
//       message: "sample text"
      

//   });
// });

module.exports = router;
