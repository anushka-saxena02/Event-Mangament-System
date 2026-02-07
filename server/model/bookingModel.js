const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, required: true },
    tickets: { type: Number, required: true },
    totalPaid: { type: Number, required: true },
    status: { type: String, default: 'confirmed' }
}, { timestamps: true });

const bookingModel = mongoose.model("Booking" ,bookingSchema)
module.exports=bookingModel;