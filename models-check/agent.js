//Written by George(Xiaoyin Zhou)

// Require the mongoose module
const mongoose = require('mongoose');
const {Schema} = mongoose;

 
const agentSchema = new Schema({
      // _id:{type: Number , required:true},
      AgentId: { type: Number, required: true},
      AgtFirstName: { type: String, required: true},
      AgtMiddleInitial: { type: String, required: false},
      AgtLastName: { type: String, required: true},
      AgtBusPhone: { type: String, required: true},
      AgtEmail: { type: String, required: true},
      AgtPosition: { type: String, required: true},
      AgencyId: { type: String, required: true},
   
    });
    
    module.exports.Agent = mongoose.model("Agent", agentSchema);