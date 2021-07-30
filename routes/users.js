var express = require("express");
var router = express.Router();
// const { User } = require("../models/user");
const User = require('../models/user').User;
const bcrypt = require("bcryptjs");

const pageRegister = {
  pagetitle: "Sign-Up",
  pageheading: "Create a new account",
  pagemessage: "Please enter the required information to create a new account.",
  hideLogin: true,
};
// const pageShowPosts = {
//   pagetitle: "Blog posts",
//   pageheading: "List all posts",
//   pagemessage: "These are all postets.",
// };


/* Sign-up page. */
router.get("/sign-up", function (req, res, next) {
  res.render("sign-up", pageRegister);
});

router.post("/sign-up", function (req, res, next) {
   // Create a new user object from the User Model
   const user = new User(req.body);
   const errs = user.validateSync(); // Run the model validation
   if (errs) {
     return processErrors(errs, req, res);
   }
   bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
     if (err) throw err;
     // Replace the plain password with the hashed password
     user.password = hashedPassword;
     // Store the use object in the DB
  
    user.save((err, result) => {
    // if(err) throw err;
      if (err) 
      { return processErrors(err, req, res);
    }
    
    const headermessage = `Account created ${result.fname}`;
    res.redirect("/?headermessage=" + headermessage);
  });
  });
});

function processErrors(errs, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render("sign-up", {
    ...pageRegister,
    errors: errorArray,
    ...req.body,
  });
}

/* login page. */
router.get("/login", function (req, res, next) {
  res.render("login");
});

module.exports = router;


