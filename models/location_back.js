//Model for locations @Susan
//Validator applied to email, phone and fax number

const mongoose = require("mongoose");
const { Schema } = mongoose;

var uniqueValidator = require('mongoose-unique-validator');

const locationSchema = new Schema({
  lname: { type: String, required:'A title for the location is required.'},
  laddress:{ type: String, required: 'Please enter an address for this location.'},
  lcity:{ type: String, required: 'Please enter city for this location'},
  lprovince:{ type: String},
  lcountry:{ type: String, required: 'Please enter country for this location.'},
  
  //Validate phone format DDD-DDD-DDDD
  lphone:{ type: String, 
  validate: {
    validator: function(v) {
      return /\d{3}-\d{3}-\d{4}/.test(v);
    },
    message: props => `${props.value} is not a valid phone number. Format should be DDD-DDD-DDDD!`
  },
  required: "A phone number is required for this location",
},
  lfax:{ type: String,
//Validate Fax
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid fax number. Format should be DDD-DDD-DDDD!`
    },
  },


  lemail:{ type: String, required: 'Please enter a contact email for this location',
//Validate Email
  validate: {
    validator: function (v) {
      return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
    },
    message: (props) => `${props.value} is not a valid Email address.`,
  },
},
  image: String,
});

locationSchema.plugin(uniqueValidator);
module.exports.Location = mongoose.model("Location", locationSchema);
