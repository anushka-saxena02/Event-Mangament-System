import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import BookingForm from '../Component/BookingForm';

const EventDetails = () => {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [tickets, setTickets] = useState(1);

  
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if(!id)return;
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data.data ||res.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };
    fetchEventData();
  }, [id]);

  if (!event) return <div className="pt-40 text-center text-white">Loading Event...</div>;

  return (
    <div className="pt-32 px-6 md:px-20 bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Event Details</span>
          <h1 className="text-5xl font-black uppercase mt-4 mb-6 leading-tight">{event.title}</h1>
          
          <div className="flex gap-8 mb-8 text-zinc-400 font-medium uppercase text-sm">
            <p>📍 {event.location}</p>
            <p>📅 {event.date}</p>
          </div>

          <p className="text-zinc-500 text-lg leading-relaxed mb-10">{event.description}</p>

    
          <div className="w-full h-80 bg-zinc-900 rounded-[3rem] overflow-hidden relative border border-zinc-800">
            <img 
              src={`http://localhost:5000/uploads/${event.image}`} 
              className="w-full h-full object-cover opacity-60" 
              alt="Event Venue" 
            />
          </div>
        </motion.div>

      
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 p-10 rounded-[3rem] border border-zinc-800 h-fit sticky top-32"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold">Select Tickets</h3>
            <span className="bg-cyan-500/10 text-cyan-400 px-4 py-1 rounded-full text-xs font-bold uppercase">
              {event.availableSeats} Seats Left
            </span>
          </div>

          <div className="flex items-center justify-between bg-black p-6 rounded-2xl mb-8">
            <span className="font-medium text-zinc-400">Standard Pass</span>
            <div className="flex items-center gap-6">
              <button onClick={() => setTickets(Math.max(1, tickets - 1))} className="text-2xl hover:text-cyan-400">-</button>
              <span className="text-2xl font-bold w-8 text-center">{tickets}</span>
              <button onClick={() => setTickets(tickets + 1)} className="text-2xl hover:text-cyan-400">+</button>
            </div>
          </div>

          <div className="flex justify-between items-center mb-10 px-2">
            <span className="text-zinc-500 uppercase tracking-widest text-xs">Total Price</span>
            <span className="text-4xl font-black">${event.price * tickets}</span>
          </div>

          <button 
            onClick={() => setShowBooking(true)}
            className="w-full py-5 bg-white text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all"
          >
            Book Now
          </button>
        </motion.div>
      </div>

      
      <AnimatePresence>
        {showBooking && (
          <BookingForm 
            event={{...event, price: event.price * tickets,selectedTickets:tickets}} 
            onClose={() => setShowBooking(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventDetails;