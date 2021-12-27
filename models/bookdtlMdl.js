// Written by Raulito Laconsay

var mongoose = require('mongoose');



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
        validate: {
            validator: function(v) {
                return v >= new Date();
            },
            message: props => `${props.value} should be greater or equal to today's date.`
        }
    },
    TripEnd: {
        type: Date,
        // required: "Please enter End date."
        validate: {
            validator: function(v) {
                return this.TripEnd >= this.TripStart;
            },
            message: props => `${props.value} should be greater or equal to Start date.`
        }
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