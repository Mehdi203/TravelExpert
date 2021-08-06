// Require the mongoose module
var mongoose = require('mongoose');

// var mongoDB = "mongodb+srv://mongo_user:Mongo@cluster0.fbonz.mongodb.net/contact?retryWrites=true&w=majority";
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the connection
// var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// db.once('open', function() {
//     console.log("we're connected! to db")
// });


// const uniqueValidator = require("mongoose-unique-validator");

const bookdtlSchema = new mongoose.Schema({
    _id: {
        type: String,
        // required: "Please enter Package ID."
    },
    BookingDetailId: {
        type: Number,
        // required: "Please enter Package ID."
    },
    ItineraryNo: {
        type: Number,
        // required: "Please enter Package ID."
    },
    TripStart: {
        type: Date,
        // required: "Please enter Start date."
        // validate: {
        //     validator: function(v) {
        //         return v >= new Date();
        //     },
        //     message: props => `${props.value} should be greater or equal to today's date.`
        // }
    },
    TripEnd: {
        type: Date,
        // required: "Please enter End date."
        // validate: {
        //     validator: function(v) {
        //         return v >= TripStart;
        //     },
        //     message: props => `${props.value} should be greater or equal to Start date.`
        // }
    },
    Description: {
        type: String,
        trim: true,
        // required: "Please enter Start date."
    },
    Destination: {
        type: String,
        trim: true,
        // required: "Please enter Start date."
    },
    BasePrice: {
        type: Number,
        // required: "Please enter Customer ID."
    },
    AgencyCommission: {
        type: Number,
        // required: "Please enter Customer ID."
    },
    BookingId: {
        type: Number,
        // required: "Please enter Package ID."
    },
    RegionId: {
        type: String,
        trim: true,
        // required: "Please enter Start date."
    },
    ClassId: {
        type: String,
        trim: true,
        // required: "Please enter Start date."
    },
    FeeId: {
        type: String,
        trim: true,
        // required: "Please enter Start date."
    },
    ProductSupplierId: {
        type: Number,
        // required: "Please enter Package ID."
    },

    // more fields defined below
});

// bookSchema.plugin(uniqueValidator);

module.exports.BookingDetail = mongoose.model('BookingDetail', bookdtlSchema);