var express = require('express');
var router = express.Router();
const processErrors = require("./processErrors");

//Get Agent List model 
const Agent = require('../models/agent').Agent;

// Home Dashboard
router.get('/', function(req, res, next) { 
    res.render('dashboard')
    });
  

router.get('/agentlist', function (req, res, next) {
    Agent.find({},(err, agents) => {
        res.render('agent_list',{ 
            title: "Our Agent List", 
            agents:agents});
    });
  });


// Add the new Agent Form 
  router.get('/add', function (req, res, next) {
    res.render("agent_add");      
});

// Post the new Agent
router.post('/add', function (req, res, next) {
    const data = req.body;
    const agt = new Agent(data); 
agt.save()
    .then(result => {
        res.redirect("agentlist");
    }).catch(err => console.log(err));
});  

//Get the edit form
router.get('/edit/:agtid', function (req, res, next) {
const agtid = req.params.agtid;
Agent.findById(agtid, (err, agt) => {
    if (err) console.log(err);
    res.render("agent_edit", { agt });
  });
});

// Agent.updateOne({ _id: req.body.id }, { $set: { AgentId: req.body.AgentId, AgtFirstName: req.body.AgtFirstName, AgtLastName: req.body.AgtLastName, :req.body.description } })
// .then(result => {
//     res.redirect('/products/' + req.body.id);
// })
// .catch(err => console.log(err));

// Process the edited product data
router.post("/edit/:agtid", function (req, res, next) {
    const agtid = req.params.agtid;
      Agent.findByIdAndUpdate(agtid, req.body, function (err) {
        res.redirect('/admin/agentlist');
    });
});

/* Delete a agent, given its Id. */
router.get("/delete/:agtid", function (req, res, next) {
    const agtid = req.params.agtid;
    Agent.findByIdAndDelete(agtid, (err) => {
      if (err) console.log(err);
      res.redirect("/admin/agentlist");
    });
  });


module.exports = router;