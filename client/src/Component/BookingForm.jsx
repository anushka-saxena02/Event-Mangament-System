import { motion } from 'framer-motion';
import { useState } from 'react';
import SuccessModal from './SuccessModal';
import axios from 'axios';

const BookingForm = ({ event, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const BASE_URL = 'https://event-mangament-system-4.onrender.com';

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      eventId: event._id,
      userName: name,
      userEmail: email,
      userPhone: phone, 
      tickets: event.selectedTickets || 1,
      totalPaid: event.price 
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/booking/confirm`, bookingData);
      if (res.data.success) {
        setShowSuccess(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-zinc-900 z-50 p-6 sm:p-10 shadow-2xl border-l border-zinc-800 overflow-y-auto"
    >
      <button onClick={onClose} className="text-zinc-500 hover:text-white mb-6 text-sm font-medium">
        ← Back to Event
      </button>
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-1 uppercase text-white">Book Event</h2>
      <p className="text-zinc-500 text-sm mb-6 border-b border-zinc-800 pb-4 line-clamp-1">{event.title}</p>

      <form onSubmit={handleBooking} className="space-y-4 sm:space-y-5">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Full Name</label>
          <input 
            type="text" 
            required
            className="w-full bg-black border border-zinc-800 p-3.5 rounded-xl focus:border-cyan-500 outline-none text-white text-sm" 
            placeholder="Enter Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full bg-black border border-zinc-800 p-3.5 rounded-xl focus:border-cyan-500 outline-none text-white text-sm" 
            placeholder="Enter Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">Mobile Number</label>
          <input 
            type="tel" 
            required
            className="w-full bg-black border border-zinc-800 p-3.5 rounded-xl focus:border-cyan-500 outline-none text-white text-sm" 
            placeholder="Enter Number" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
          />
        </div>

        <div className="bg-black p-5 rounded-2xl border border-zinc-800 mt-6">
          <div className="flex justify-between items-center mb-3 text-sm">
            <span className="text-zinc-400">Total Tickets</span>
            <span className="text-white font-bold">{event.selectedTickets || 1}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg pt-3 border-t border-zinc-800">
            <span className="text-white">Total Pay</span>
            <span className="text-cyan-400">${event.price}</span>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-white text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all text-xs sm:text-sm mt-4"
        >
          Pay & Confirm
        </button>
      </form>

      {showSuccess && <SuccessModal isOpen={showSuccess} onClose={onClose} />}
    </motion.div>
  );
};

export default BookingForm;
