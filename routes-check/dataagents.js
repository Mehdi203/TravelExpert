//Written by Mohammadmehdi Noroozi(Mehdi)

var serverTwo = process.env.DATA_URL ||"http://127.0.0.1:8050/";

module.exports = function (req, res) {
    if (req.user.role == "customer" ) {
      // || req.user.role != "agent"

    // if (!currentUser && currentUser.role != "mgmt") { 

      req.session.msg = "You are not allowed to acces the business data.";
      res.status(403).redirect("/");
    }

    else if (req.user.role == "agent" && req.user.username == "coville") {
      var urlParams = "coville";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "dahl") {
      var urlParams = "dahl";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "delton") {
      var urlParams = "delton";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "dixon") {
      var urlParams = "dixon";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "jones") {
      var urlParams = "jones";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }
    else if (req.user.role == "agent" && req.user.username == "lisle") {
      var urlParams = "lisle";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }
    else if (req.user.role == "agent" && req.user.username == "merrill") {
      var urlParams = "merrill";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "peterson") {
      var urlParams = "peterson";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else if (req.user.role == "agent" && req.user.username == "reynolds") {
      var urlParams = "reynolds";
      res.render("data-agents", { serverTwo: serverTwo + urlParams });

    }

    else {
      req.session.msg = "You are not allowed to acces the business data.";
      res.status(403).redirect("/");
    }


  };
  

    // res.render("data-agents", {serverTwo: serverTwo + "/Dahl"});
    // Use this variable to send paramters to the Python data project through the URL  
    // var urlParams = "Greece/545";
    // res.render("data", { serverOne: serverOne + urlParams });
  // };
  