//Written by Xiaoyin Zhou

var express = require('express');
var router = express.Router();
var auth = require('../models/auth.js');
var isAgent = auth.isAgent;
var isMgmt = auth.isMgmt;

//Get Agent List model 
const Agent = require('../models/agent').Agent;


// Dashboard for Mgmt 
router.get('/mgmtview', isMgmt, function(req, res, next) { 
    res.render('mgmt_view')
    });



// Dashboard for Agent
router.get('/agentview', isAgent, function(req, res, next) { 
  res.render('agent_view')
  });
  

router.get('/agentlist', isAgent, function (req, res, next) {
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

//Get the edit agent
router.get('/edit/:id', function (req, res, next) {
const id = req.params.id;

Agent.findById(id, (err, agt) => {
    if (err) console.log(err);
    res.render("agent_edit", { agt });
  });
});

router.post('/edit/:id', function (req, res, next) {
const conditions = {_id:req.params.id};

Agent.update(conditions, req.body)
   .then(result => {
      res.redirect("/admin/agentlist");
      console.log(result)
  })
    .catch(err => console.log(err));

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
