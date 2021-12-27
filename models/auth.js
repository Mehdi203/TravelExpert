//Written by George(Xiaoyin Zhou)
exports.isAgent = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.currentUser.role == "agent") {
        next();
    } else {
        res.redirect('/users/login');
    }
}

exports.isMgmt = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.currentUser.role == "mgmt") {
        next();
    } else {
        res.redirect('/users/login');
    }
}