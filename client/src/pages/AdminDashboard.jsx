import axios from 'axios';
import { useEffect, useState } from 'react';
import SuccessModal from '../Component/SuccessModal';

const AdminDashboard = () => {
  const [eventData, setEventData] = useState({
    title: '',
    location: '',
    price: '',
    seats: '',
    description: '',
    date: ''
  });
  const [image, setImage] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const BASE_URL = 'https://event-mangament-system-4.onrender.com';

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/events/all`);
      setAllEvents(res.data.data);
    } catch (err) {
      console.error("error", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const handleEdit = (ev) => {
    setEventData({
      title: ev.title,
      location: ev.location,
      price: ev.price,
      seats: ev.availableSeats || ev.seats,
      description: ev.description,
      date: ev.date ? ev.date.split('T')[0] : '',
      image: ev.image
    });
    setIsEditing(true);
    setEditId(ev._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', eventData.title);
    data.append('location', eventData.location);
    data.append('price', eventData.price);
    data.append('seats', eventData.seats);
    data.append('description', eventData.description);
    data.append('date', eventData.date);
    if (image) {
      data.append('image', image);
    }

    try {
      let res;
      if (isEditing) {
        res = await axios.put(`${BASE_URL}/api/events/update/${editId}`, data);
      } else {
        res = await axios.post(`${BASE_URL}/api/events/create`, data);
      }
      if (res.data.success) {
        alert(isEditing ? "Event Updated successfully..!" : "New Event created..!");
        setIsEditing(false);
        setEditId(null);
        setEventData({ title: "", location: "", price: "", seats: "", description: "", date: "" });
        setImage(null);
        fetchEvent();
        setShowModal(true);
      }
    } catch (err) {
      alert("Event operation failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event...?")) {
      try {
        const res = await axios.delete(`${BASE_URL}/api/events/delete/${id}`);
        if (res.data.success) {
          alert("Event deleted successfully...!");
          fetchEvent();
        }
      } catch (err) {
        alert("Error: " + (err.response?.data?.message || "Delete Failed"));
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Max Width Wrapper so layout doesn't break on large screens */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">Admin Panel</h1>
          <p className="text-zinc-500 mt-1 text-sm">Manage your events and bookings here.</p>
        </div>

        {/* Main Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Form (5 columns) */}
          <div className="lg:col-span-5 bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800">
            <h2 className="text-xl font-bold mb-6 text-cyan-400">
              {isEditing ? "Update Event Details" : "Create Event"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Event Title</label>
                <input 
                  type="text" 
                  value={eventData.title}
                  required
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white placeholder-zinc-600"
                  placeholder="Event Title"
                  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Event Location</label>
                <input 
                  type="text" 
                  value={eventData.location}
                  required
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white placeholder-zinc-600"
                  placeholder="Enter location"
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    value={eventData.price}
                    required
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white placeholder-zinc-600"
                    onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Total Seats</label>
                  <input 
                    type="number"
                    value={eventData.seats}
                    required
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white placeholder-zinc-600"
                    onChange={(e) => setEventData({ ...eventData, seats: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Date</label>
                <input 
                  type="date" 
                  required
                  value={eventData.date}
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white color-scheme-dark"
                  onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full bg-black border border-zinc-800 p-3 rounded-xl focus:border-cyan-500 outline-none text-sm text-white placeholder-zinc-600 resize-none"
                  placeholder="Description"
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest text-zinc-400 block mb-1">Event Image</label>
                
                <div className="flex gap-4 items-center mb-2">
                  {isEditing && !image && eventData.image && (
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block mb-1">Current</span>
                      <img 
                        src={`${BASE_URL}/uploads/${eventData.image}`} 
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=200&auto=format&fit=crop';
                        }}
                        className="w-12 h-12 object-cover rounded-lg border border-zinc-800" 
                        alt="Old"     
                      />
                    </div>
                  )}

                  {image && (
                    <div>
                      <span className="text-[10px] text-cyan-400 uppercase block mb-1">New</span>
                      <img 
                        src={URL.createObjectURL(image)} 
                        className="w-12 h-12 object-cover rounded-lg border border-cyan-400" 
                        alt="New"
                      />
                    </div>
                  )}
                </div>

                <input 
                  type="file" 
                  required={!isEditing}
                  className="w-full bg-black border border-zinc-800 p-2.5 rounded-xl focus:border-cyan-500 outline-none text-xs text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-zinc-800 file:text-white hover:file:bg-zinc-700"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-white text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all text-xs mt-4">
                {isEditing ? "Update Event" : "Publish Event"}
              </button>
            </form>
          </div>

          {/* Right Side: Table (7 columns) */}
          <div className="lg:col-span-7 bg-zinc-900/80 p-6 sm:p-8 rounded-3xl border border-zinc-800 w-full overflow-hidden">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Manage Live Events</h2>
            
            {/* Scrollable table wrapper */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase tracking-widest">
                    <th className="pb-3 px-2">Event</th>
                    <th className="pb-3 px-2">Price</th>
                    <th className="pb-3 px-2">Location</th>
                    <th className="pb-3 px-2">Seats</th>
                    <th className="pb-3 px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm">
                  {allEvents.length > 0 ? (
                    allEvents.map((ev) => (
                      <tr key={ev._id} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="py-4 px-2 font-semibold max-w-[150px] truncate">{ev.title}</td>
                        <td className="py-4 px-2 text-cyan-400 font-bold">${ev.price}</td>
                        <td className="py-4 px-2 text-zinc-400 max-w-[120px] truncate">{ev.location}</td>
                        <td className="py-4 px-2 text-zinc-400">{ev.availableSeats ?? ev.seats}</td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEdit(ev)} className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-all text-[11px] font-bold">
                              EDIT
                            </button>
                            <button onClick={() => handleDelete(ev._id)} className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[11px] font-bold">
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-zinc-500">No events found.</td>
                    </tr>
                  )}
                </tbody>   
              </table>
            </div>
          </div>

        </div>

        {/* Instructions Bottom */}
        <div className="mt-8 bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60">
          <h3 className="text-sm font-bold mb-2 text-zinc-300">Quick Instructions</h3>
          <ul className="text-zinc-500 flex flex-wrap gap-x-8 gap-y-2 text-xs">
            <li>• Fill all details to make the event live.</li>
            <li>• Total seats will be updated in real-time.</li>
            <li>• You can delete or edit events anytime from the table above.</li>
          </ul>
        </div>

      </div>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AdminDashboard;
