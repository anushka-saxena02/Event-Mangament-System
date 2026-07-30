import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const BASE_URL = 'https://event-mangament-system-4.onrender.com';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/events/all`);
        setEvents(res.data.data);
      } catch (err) {
        console.error("Data fetch error", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-32 px-6 md:px-12 pb-16 min-h-screen bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event._id} className="w-full group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="w-full h-48 bg-zinc-800 overflow-hidden">
                <img 
                  src={`${BASE_URL}/uploads/${event.image}`} 
                  alt={event.title} 
                  onError={(e) => {
                    // FIXED: Fallback Image if Render upload link fails
                    e.target.src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold uppercase text-white line-clamp-1">{event.title}</h3>
                <p className="text-zinc-500 text-sm mt-2 mb-4">
                   📍 {event.location} • 🪑 {event.availableSeats} Seats Left
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link to={`/events/${event._id}`}>
                <button className="w-full py-3 bg-zinc-800 hover:bg-white hover:text-black transition-all rounded-xl text-white font-semibold text-sm">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
