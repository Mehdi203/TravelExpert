// --------------------------- BOOKING CONTROLLER --------------------------- //

  // //**
  // * Name: Fariha Siddiqui
  // * Student ID: 000880957
  // * Date: 12-08-2021
  // * Purpose: THREADED PROJECT OF PROJ-009-004
  // ** //

// ---------------------------------------------------------------------------- //


// --------------------------- Require express module --------------------------- //

var express = require('express');
var router = express.Router();

// --------------------------- Require User-Defined Booking module --------------------------- //
const Booking = require("../models/bookMdl").Booking;

// --------------------------- Require User-Defined Booking Details module -------------------- //
const BookingDetails = require("../models/bookDetailsMdl").BookingDetails;



// --------------------------- CANCEL a Booking --------------------------- //
router.post("/cancel", function (req, res, next) {

    const booking = new Booking();

    booking.BookingId = req.body.BookingId;
    
    // -------- Updating and setting Active to false 
    Booking.findByIdAndUpdate(booking.BookingId, {$set:{Active:false}}, req.body, function (err, booking) {
    
        // -------- Handle Error
        if (err) return processErrors(err, "booking-details", req, res);
        
        // -------- Redirect to All Bookings page after Cancellation
        res.redirect("/booking/all/" + booking.CustomerId);
    });
});


// ------------------- Show a single booking by BookingID ------------------------ //
router.get('/:bookid', function(req, res, next) {
    const bid = req.params.bookid;
  
    // -------- Get all Booking Data by bookid
    Booking.findOne({BookingId: bid}, (err, bookings) => {
        // -------- Handle Error
        if (err) throw err;
    
        // -------- Get all Booking Details Data by BookingID
        BookingDetails.findOne({BookingId: bookings.BookingId}, (err, bookingdetails) => {
          
          // -------- Handle Error
          if (err) throw err;
  
          // -------- Define a boolean to value to check if Trip Start Date is in future
          const BookDate = bookingdetails.TripStart.toDateString();
          var inFuture = bookingdetails.TripStart > new Date();

        // -------- Show Booking Details page
        res.render('booking-details', { title: "Booking Details", bookings, bookingdetails, BookDate, inFuture });

    });
  });
});


// ------------------- GET all bookings list ------------------------ //
router.get('/all/:custid', function (req, res, next) {

  const cid = Number(req.params.custid);

      // -------- Get all Booking Data by bookid
      Booking.find({CustomerId: cid}, (err, bookings) => {
          // -------- Handle Error
          if (err) throw err;

        // -------- Get all Booking Details Data by BookingID
        BookingDetails.find({CustomerId: cid}, (err, bookingdetails) => {

          // -------- Define a boolean to value to check if Booking is old or not
          var oldBooking = bookingdetails.TripStart < new Date();
          // -------- Handle Error
          if (err) throw err;

          // -------- Show All Bookings page
          res.render('booking-list', { title: "My Bookings", bookings, bookingdetails, oldBooking });
      });
});
});


// ------------------- Edit Booking by BookingID ------------------------ //
router.get('/edit/:bookid', function(req, res, next) {
    const bid = req.params.bookid;

    // -------- Get Booking Data by BookingID
    Booking.findOne({BookingId: bid}, (err, bookings) => {

      // -------- Handle Error
          if (err) throw err;
          const BookDate = bookings.BookingDate.toDateString();
          
          // -------- Show Booking-Update form
          res.render('booking-edit', { title: "Edit Booking", bookings, BookDate });
    });
});


// ------------------- Process the edited Booking Data ------------------------ //
router.post("/edit/:bookid", function (req, res, next) {
    const bookid = req.params.bookid;
    new Booking(req.body).validate((err) => {
      
      // -------- To validate the data before updating
      if (err)
        return processErrors(err, "booking-details", req, res, {
          booking: { ...req.body, _id: bookid },
        });

        // -------- Updating Booking Data
        Booking.findByIdAndUpdate(bookid, req.body, function (err) {
        if (err)
          return processErrors(err, "booking-details", req, res);
        
          // -------- Redirect to previous page: Booking Details page
          res.redirect("/booking/" + bookid);
      });
    });
});



// -------------- Process Errors for Error Handling--------------------- //

function processErrors(errs, pageTemplate, req, res, data) {
    // If there are errors from the Model schema
    const errorArray = [];
    const errorKeys = Object.keys(errs.errors);
    errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
    return res.render(pageTemplate, {
      errors: errorArray,
      ...req.body,
      ...data,
    });
  }
  

module.exports = router;
