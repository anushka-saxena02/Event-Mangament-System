const express = require('express');
const { createBooking, getAllBookings, getUserBookings } = require('../controller/bookingController');



const routes = express.Router();


routes.post('/confirm', createBooking)
routes.get('/all', getAllBookings)
routes.get('/my-bookings/:email',getUserBookings);

module.exports = routes;