// Written by Raulito Laconsay

var express = require('express');
var router = express.Router();

/* Raul */
const Booking = require('../models/bookMdl').Booking;
const BookingDetail = require('../models/bookdtlMdl').BookingDetail;



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('booking-list', { title: 'Booking' });
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
        post.Active = true;
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

                // console.log('no error');
                // res.render("thankyou", {
                //     fname: data.custid
                // });

                console.log('no error');

                var totpr = Number(data.price) * Number(data.numTraveler);

                console.log(totpr);

                console.log(data);

                res.render("thankyou-buy", {

                    // fname: data.userid,

                    totalprice: totpr

                });
            });


        });
    });


});



module.exports = router;