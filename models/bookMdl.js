// --------------------------- BOOKING MODEL --------------------------- //

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


// --------------------------- Booking Schema  --------------------------- //

const bookSchema = new Schema({

    _id: { type: Number },
  BookingId: { type: Number },
  BookingDate: { type: Date },
  BookingNo: { type: String },
  TravelerCount: { type: Number },
  CustomerId: Number,
  TripTypeId: { type: String },
  PackageId: { type: Number },
  Active: Boolean,

});

// ---------------------------Exporting Booking Schema  --------------------------- //
    
module.exports.Booking = mongoose.model("Booking", bookSchema);
