var express = require('express');
var router = express.Router();
const Booking = require('../models/bookMdl').Booking;
const BookingDetail = require('../models/bookdtlMdl').BookingDetail;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('booking-list', { title: 'Booking' });
});


// // Show the create form
// router.get('/create', function(req, res, next) {
//     res.render('contact-create', { title: 'Thank You' });
// });

/* GET all posts listing. */
router.get('/all', function (req, res, next) {

    Booking.find({}, (err, bookings) => {
    if (err) throw err;
    res.render('booking-list', { title: "My Bookings", bookings });
    });
    });


// To create a new booking
router.post('/', function(req, res, next) {
    console.log('booking/add');
    const data = req.body;
    const post = new Booking();
    console.log("Logging Data to Console");
    console.log(data);

    Booking.findOne({}, {}, { sort: { 'BookingId': -1 } }, (err, bookings) => {
        // console.log(bookings.BookingId);
        // var bid = Number(bookings.BookingId) + 1;
        // console.log(bid);

        post.BookingId = Number(bookings.BookingId) + 1;
        post.BookingDate = new Date();
        post._id = Number(post.BookingId);
        post.BookingNo = post.BookingId;
        post.TravelerCount = Number(data.numTraveler);
        post.CustomerId = Number(data.custid);
        post.PackageId = Number(data.packid);
        post.TripTypeId = data.triptype;
        console.log(post);

        // Add to bookings collection
        post.save(err => {
            // if(err) throw err;
            if (err) {
                console.log('error');
                console.log(err);
                const errorArray = [];
                const errorKeys = Object.keys(err.errors);
                errorKeys.forEach(key => errorArray.push(err.errors[key].message));
                return res.render("booking", {
                    postdata: req.body,
                    errors: errorArray
                });
            }

            // Add to bookingdetails collection
            console.log('starting bookingdetails');
            BookingDetail.findOne({}, {}, { sort: { 'ItineraryNo': -1 } }, (err, bookingdetails) => {
                const postdtl = new BookingDetail();
                console.log('in bookingdetails');
                console.log(bookingdetails);
                postdtl.BookingDetailId = post.BookingId;
                postdtl.BookingId = post.BookingId;
                postdtl._id = Number(post.BookingId);
                postdtl.ItineraryNo = Number(bookingdetails.ItineraryNo) + 1;
                postdtl.TripStart = data.startdate;
                postdtl.TripEnd = data.enddate;
                postdtl.Description = data.desc;
                postdtl.Destination = data.dest;
                postdtl.BasePrice = data.price;
                postdtl.AgencyCommission = data.comm;
                postdtl.ClassId = data.class;
                console.log(postdtl);
                postdtl.save(err => {
                    if (err) {
                        console.log('error');
                        console.log(err);
                        const errorArray = [];
                        const errorKeys = Object.keys(err.errors);
                        errorKeys.forEach(key => errorArray.push(err.errors[key].message));
                        return res.render("booking", {
                            postdata: req.body,
                            errors: errorArray
                        });
                    }
                });

                console.log('no error');
                res.render("thankyou", {
                    fname: data.custid
                });
            });


        });
    });


});



//show a single booking by BOOKID 
router.get('/:bookid', function(req, res, next) {
    const bid = req.params.bookid;
  
    Booking.findOne({BookingId: bid}, (err, bookings) => {
        const BookDate = bookings.BookingDate.toDateString();
        var inFuture = bookings.BookingDate > new Date();

        res.render('booking-details', { title: "My Bookings", bookings, BookDate, inFuture });

    });
});


// /* GET Booking Edit form with given booking Id  */
router.get('/edit/:bookid', function(req, res, next) {
    const bid = req.params.bookid;

    Booking.findOne({BookingId: bid}, (err, bookings) => {
        const BookDate = bookings.BookingDate.toDateString();
        res.render('booking-edit', { title: "My Bookings", bookings, BookDate });

    });
});


// Process the edited booking data
router.post("/edit/:bookid", function (req, res, next) {
    const bookid = req.params.bookid;
    new Booking(req.body).validate((err) => {
      // To validate the data before updating
      if (err)
        return processErrors(err, "booking-details", req, res, {
          bookings: { ...req.body, _id: bookid },
        });
        Booking.findByIdAndUpdate(bookid, req.body, function (err) {
        if (err)
          return processErrors(err, "booking-details", req, res);
        res.redirect("/booking/" + bookid);
      });
    });
});

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