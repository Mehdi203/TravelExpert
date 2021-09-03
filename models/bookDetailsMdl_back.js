// --------------------------- BOOKING DETAILS MODEL --------------------------- //

  // //**
  // * Name: Fariha Siddiqui
  // * Student ID: 000880957
  // * Date: 12-08-2021
  // * Purpose: THREADED PROJECT OF PROJ-009-004
  // ** //

// ---------------------------------------------------------------------------- //


// --------------------------- Require the mongoose module --------------------------- //

var mongoose = require('mongoose');
var {Schema} = mongoose;


// --------------------------- Booking Details Schema  --------------------------- //

const bookingDetailsSchema = new Schema({
    
    _id: { type: Number },
    BookingDetailId: { type: Number },
    ItineraryNo: { type: Number },
    TripStart: { type: Date },
    TripEnd: { type: Date },
    Description: { type: String },
    Destination: { type: String },
    BasePrice: { type: Number },
    AgencyCommission: { type: Number },
    BookingId: { type: Number },
    RegionId: { type: String },
    ClassId: { type: String },
    FeeId: { type: String },
    ProductSupplierId: { type: Number }

});

// ---------------------------Exporting Booking Schema  --------------------------- //

module.exports.BookingDetails = mongoose.model("BookingDetails", bookingDetailsSchema);
