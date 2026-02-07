import { motion } from 'framer-motion';
import { useState } from 'react';
import SuccessModal from './SuccessModal';
import axios from 'axios';

const BookingForm = ({ event, onClose }) => {
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [phone,setPhone]=useState('');
const [showSuccess,setShowSuccess]=useState(false);

const handleBooking =async(e)=>{
  e.preventDefault();
  const bookingData = {
      eventId: event._id,
      userName: name,
      userEmail: email,
      userPhone: phone, 
      tickets: 1,
      totalPaid: event.price 
    };
    try {
      const res = await axios.post('http://localhost:5000/api/booking/confirm', bookingData);
      
      if (res.data.success) {
        setShowSuccess(true);
      }
    } catch (err) {
    
      alert (err.response?.data?.message || err.message);
    }
}
  return (
    <motion.div 
      initial={{ x: '100%' }} 
      animate={{ x: 0 }} 
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-full md:w-450px bg-zinc-900 z-100
       p-10 shadow-2xl border-l border-zinc-800 overflow-y-auto"
    >
      <button onClick={onClose} className="text-zinc-500 hover:text-white mb-8">
         Back to Event</button>
      
      <h2 className="text-3xl font-bold mb-2 uppercase">Book Event</h2>
      <p className="text-zinc-500 mb-8 border-b border-zinc-800 pb-4">{event.title}</p>

      <div className="space-y-6">
        <form onSubmit={handleBooking} className='space-y-6'>
        <div>
          
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2"
          >Full Name</label>
          <input type="text" className="w-full bg-black border border-zinc-800 p-4
           rounded-xl focus:border-cyan-500 outline-none" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} />
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
            Email Address</label>
          <input type="email" className="w-full  bg-black border border-zinc-800 p-4 rounded-xl focus:border-cyan-500 outline-none" placeholder="Enter Your Email"  onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">
            Mobile Number</label>
          <input type="tel" className="w-full bg-black border border-zinc-800 p-4 
          rounded-xl focus:border-cyan-500 outline-none" placeholder="Enter Number" onChange={(e)=>setPhone(e.target.value)} />
        </div>

        <div className="bg-black p-6 rounded-2xl border border-zinc-800 mt-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-400">Price per ticket</span>
            <span>${event.price}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-xl pt-
          4 border-t border-zinc-800">
            <span>Total Pay</span>
            <span className="text-cyan-400">${event.price}</span>
          </div>
        </div>

        <button className="w-full py-5 bg-white text-black font-black rounded-full 
        uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all mt-6">
          Pay & Confirm
        </button>
        </form>
        {showSuccess && <SuccessModal isOpen={showSuccess} onClose={onClose}/>}
      </div>
    </motion.div>
  );
};
export default BookingForm