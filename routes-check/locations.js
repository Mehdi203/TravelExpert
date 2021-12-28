//@Susan
//Display Locations

var express = require("express");
var router = express.Router();
var auth = require('../models/auth.js');
var isAgent = auth.isAgent;
var isMgmt = auth.isMgmt;

//require model location.js with schema
const { Location } = require("../models/location");



router.get('/only', function (req, res, next) { //George: Show Only Static Information
  Location.find({},(err, locations) => {
      res.render('displaylocationsonly',{ title: "Our Locations", locations});
  });
});



//This is under Admin/Mgmt View 
/*Display Locations*/
router.get('/', isMgmt,function (req, res, next) {
  Location.find({},(err, locations) => {
      res.render('displaylocations',{ title: "Our Locations", locations});
  });
});



/* GET the ADD form. */
router.get("/add", isMgmt, function (req, res, next) {
  res.render("locationadd");//might have to delete add was /add
});

// Process the added location data
router.post("/add", isMgmt, function (req, res, next) {
  const data = req.body;
  const loc = new Location(data);

  // Make sure the image starts with /images/, or add it to the image path
  if (loc.image && !loc.image.includes("/images/"))
    loc.image = "/images/" + loc.image;
  loc.save(function (err) {
    // Create a new record in the DB
    if (err) return processErrors(err, "locationadd", req, res, { add: true });
    res.redirect("/"); // Always redirect to another page after you process the form submission
  });
});

/* GET the Edit form using location Id. */
router.get("/edit/:locid", isMgmt, function (req, res, next) {
  const locid = req.params.locid;
  Location.findById(locid, (err, loc) => {
    if (err) console.log(err);
    res.render("locationadd", { loc, add: false });
  });
});

// EDIT Process the edited location data
router.post("/edit/:locid",isMgmt, function (req, res, next) {
  const locid = req.params.locid;
  new Location(req.body).validate((err) => {
    // Validate the data before updating
    if (err)
      return processErrors(err, "locationadd", req, res, {
        add: false,
        loc: { ...req.body, _id: locid },
      });
    Location.findByIdAndUpdate(locid, req.body, function (err) {
      if (err)
        return processErrors(err, "locationadd", req, res, { add: false });
      res.redirect("/location/details/" + locid);
    });
  });
});

/* DELETE location, given its Id. */
router.get("/delete/:locid", isMgmt, function (req, res, next) {
  const locid = req.params.locid;
  Location.findByIdAndDelete(locid, (err) => {
    if (err) console.log(err);
    //req.session.msg = `Location deleted ${locid}`;
    res.redirect("/location");
  });
});

/* GET the locationdetails page given location Id. */
router.get("/details/:locid",isMgmt,function (req, res, next) {
  const locid = req.params.locid;
  Location.findById(locid, (err, loc) => {
    if (err) console.log(err);
    res.render("locationdetails", { loc });
  });
});


function processErrors(errs, pageTemplate, req, res, data) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render(pageTemplate, {
    errors: errorArray,
    ...req.body,
    ...data,
  });
}

module.exports = router;
