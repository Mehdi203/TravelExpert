var express = require('express');
var router = express.Router();
const getPackages = require("../models/packagesMdl").getPackages;


/* GET home page. */
router.get('/', function(req, res, next) {
  getPackages(null, (err, data) => {
    if (err) throw err
  res.render('packages',
  {
    packages: data

  });
});

});



/*Get all packages list. */
router.get('/details/:id', function (req, res, next) {
  const PackageId = req.params.id
  getPackages(PackageId,(err, data) => {
    if (err) throw err
  res.render('packages',
  {
    packages: data,
    isdetails: true


  });
});

});


module.exports = router;

// middleware that is specific to this router,
// checks that the user must be logged in
router.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  if (!req.user) res.status(403).redirect("/");
  //else if (req.user.role != "agent") res.status(403).redirect("/");
  else next();
});