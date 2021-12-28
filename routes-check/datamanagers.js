//Written by Mohammadmehdi Noroozi(Mehdi)

var serverOne = process.env.DATA_URL || "http://127.0.0.1:8050/";

module.exports = function (req, res) {
    if (!req.user || req.user.role != "mgmt") {

    // if (!currentUser && currentUser.role != "mgmt") { 

      req.session.msg = "You are not allowed to acces the business data.";
      res.status(403).redirect("/");
    }
    res.render("data-managers", {serverOne});
    // Use this variable to send paramters to the Python data project through the URL  
    // var urlParams = "Greece/545";
    // res.render("data", { serverOne: serverOne + urlParams });
  };
  