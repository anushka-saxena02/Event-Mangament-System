import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events/all');
        setEvents(res.data.data);
      } catch (err) {
        console.error("Data fetch error", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {events.map((event) => (
        
        <div key={event._id} className=" max-w-2xl  group bg-zinc-900 rounded-3xl overflow-hidden border mt-40 border-zinc-800">

          <img 
            src={`http://localhost:5000/uploads/${event.image}`} 
            alt={event.title} 
            className="w-full h-48 object-cover" 
          />
          
          <div className="p-6">
            <h3 className="text-xl font-bold uppercase">{event.title}</h3>
            <p className="text-zinc-500 text-sm mb-4">
               {event.location} • {event.availableSeats} Seats Left
            </p>
            
            <Link to={`/events/${event._id}`}>
              <button className="w-full py-3 bg-zinc-800 hover:bg-white hover:text-black transition-all rounded-xl">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;