// Require the mongoose module
var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
 

  const contactSchema = new mongoose.Schema({
       name:  {
            type:  String,
            required:  "Please enter your name",
            trim:  true,
            validate: {
                validator: function (v) {
                    return v.length > 1;
                },
                message: props => `Your name should be at least 2 characters`           
            }
        },

        email:  {
            type:  String,
            required:  "Please enter your email",
            trim:  true,
            unique: "This email address already exists. please enter another email",
            validate: {
                validator: function (v) {
                  return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
                },
                message: (props) => `${props.value} is not a valid Email address.`,
              },

        },

        subject:  {
            type:  String,
            required:  "Please enter the subject of your message",
            trim:  true
        },

       message:  {
            type:  String,
            required:  "Please enter your message",
            trim:  true,
            validate: {
                validator: function (v) {
                    return v.length > 5;
                },
                message: props => `Your message should be at least 6 characters`,          
            }
        },

        contacturl:  {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
                },
                message: props => `${props.value} is not a valid URL slug.`
            },
            required: 'Please enter the contact url slug'
        },

        //  more  fields  defined  below
    });
    

contactSchema.plugin(uniqueValidator);
module.exports.Contact = mongoose.model("Contact", contactSchema);

