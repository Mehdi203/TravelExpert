// npm i bcryptjs
// npm i express-session
// npm i passport
// npm i passport-local
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
//

// Configure the app to use Passport
module.exports.init = function (app) {
  app.use(
    require("express-session")({
      secret: process.env.PASSPORT_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

  // Use a User Model to store and retrieve the user information
  const { User } = require("./models/user");

  passport.use(
    // Do the login check
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        } // Error loading user from DB
        if (!user) {
          return done(null, false);
        } // No user
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { msg: "Incorrect password" });
          }
        });
      });
    })
  );
  // Serialize the User ID
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  // Deserialize the user ID
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  // Login Endpoint, recieves the user login from a login form
  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/users/login" }),
    function (req, res) {
      const headermessage = `Welcome ${req.user?.username}`;
      res.redirect("/?headermessage=" + headermessage);
    }
  );
  // After login, adds the user object to locals.currentUser which is accesible in the .pug files
  app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
  });

  // The logout endpoint
  app.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
