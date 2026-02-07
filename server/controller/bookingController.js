const eventModel = require('../model/eventModel');
const bookingModel = require('../model/bookingModel')

const createBooking = async (req, res) => {
    try {
        const { eventId, userName, userEmail, userPhone, tickets, totalPaid } = req.body;
    const event = await eventModel.findById(eventId);
        if (!event || event.availableSeats < tickets) {
            return res.status(400).json({ success: false, message: "Seats are not available" });
        }
        const newBooking = await bookingModel.create({eventId, userName, userEmail,userPhone,tickets,totalPaid });
        event.availableSeats -= tickets;
        await event.save();
       res.status(201).json({ success: true,message: "Booking is confirm",booking: newBooking});

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate('eventId');
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getUserBookings = async (req, res) => {
    try {
        const { email } = req.params; 
        const bookings = await bookingModel.find({ userEmail: email }).populate('eventId');
        if (bookings.length === 0) {
            return res.status(404).json({ success: false, message: "This email is not exists in booking entry" });
         }
          res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports={createBooking ,getUserBookings,getAllBookings}