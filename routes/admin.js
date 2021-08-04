var express = require('express');
var router = express.Router();

//Get Agent List model 
const Agent = require('../models/agent').Agent;

router.get('/', function(req, res, next) { 
    res.render('dashboard')
    });
  

router.get('/agentlist', function (req, res, next) {
    Agent.find({},(err, agents) => {
        res.render('agentlist',{ 
            title: "Our Agent List", 
            agents:agents});
    });
  });


// Add the new Agent Form 
  router.get('/add', function (req, res, next) {
    res.render("addagent");      
});

// router.post('/add', function (req, res, next) {
//     const data = req.body;
//     const agent = new Agent(data);
//     agent.save(function(err) {
//         if (err) return handleError(err);
//         res.redirect('agentlist')
//     });

// });

router.post('/add', function (req, res, next) {
const agent = new Agent({
        AgentId: req.body.AgentId,
        AgtFirstName: req.body.AgtFirstName,
        AgtMiddleInitial: req.body.AgtMiddleInitial,
        AgtLastName: req.body.AgtLastName,
        AgtBusPhone: req.body.AgtBusPhone,
        AgtEmail: req.body.AgtEmail,
        AgtPosition: req.body.AgtPosition,
        AgencyId: req.body.AgencyId,
});

agent.save()
    .then(result => {
        res.redirect("agentlist");
    }).catch(err => console.log(err));


});    


router.post('/delete', function (req, res, next) {

agent.deleteOne(_id：req.body.id) 
    .then(result => {
        res.redirect('agentlist');
    })
    .catch(err => console.log(err));
});


module.exports = router;