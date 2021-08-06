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
router.get('/all', function(req, res, next) {
    console.log('booking/all');
    Booking.find((err, bookings) => {
        res.render('booking-list', { bookingPosts: bookings });
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

// Shows a single post
router.get('/:custid', function(req, res, next) {
    const cid = Number(req.params.custid);
    Booking.find({ CustomerId: cid }, (err, bookings) => {
        console.log(cid);
        res.render('booking-list', { bookingPosts: bookings });
    });
});

module.exports = router;