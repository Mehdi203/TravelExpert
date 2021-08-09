exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.currentUser.role == "admin") {
        next();
    } else {
        res.redirect('/users/login');
    }
}

