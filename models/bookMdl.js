// Require the mongoose module
var mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    _id: {
        type: String,
        // required: "Please enter Package ID."
    },
    BookingId: {
        type: Number,
        // required: "Please enter Package ID."
    },
    BookingDate: {
        type: Date,
        // required: "Please enter Start date."
    },
    BookingNo: {
        type: String,
        // required: "Please enter Start date."
    },
    CustomerId: {
        type: Number,
        // required: "Please enter Customer ID."
    },
    TravelerCount: {
        type: Number,
        // required: "Please enter number of Travlers.",
        validate: {
            validator: function(v) {
                return v >= 1;
            },
            message: props => `${props.value} must be between 1 and 999.`
        }
    },
    TripTypeId: {
        type: String,
        // required: "Please enter Start date."
    },
    PackageId: {
        type: Number,
        // required: "Please enter Package ID."
    },

    // more fields defined below
});

// bookSchema.plugin(uniqueValidator);

module.exports.Booking = mongoose.model('Booking', bookSchema);