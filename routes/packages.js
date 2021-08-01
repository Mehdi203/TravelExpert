var express = require('express');
var router = express.Router();
// const getPackages = require("../models/packagesMdl").getPackages;
var {Package} = require("../models/packagesMdl");

//show all packages
router.get('/', function (req, res, next) {
  Package.find({},(err, packages) => {
    
    res.render('packages', { title: "Our Packages", packageList:packages });
    console.log(packages)
  });
});



// show a single package

router.get('/:id', function(req, res, next) {
  const pid = req.params.id;

  Package.findOne({PackageId: pid},(err, packages) => {
    
    res.render('package-single',
    {
      packageList:packages,
       
    });
    console.log(packages)
  });
 
});



module.exports = router;