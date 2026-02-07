import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SuccessModal from '../Component/SuccessModal';

const AdminDashboard = () => {
  const [eventData, setEventData] = useState({
    title: '',
    location: '',
    price: '',
    seats: '',
    description:'',
    date:''
  });
  const [image ,setImage]=useState(null);
  const[allEvents,setAllEvents]=useState([]);
  const[showModal,setShowMoadal]=useState(false)
  const fetchEvent=async()=>{
    try{
    const res=await axios.get('http://localhost:5000/api/events/all')
    setAllEvents(res.data.data);
    }catch(err){
    console.error("error",err)
    }
  }
  useEffect(()=>{
    fetchEvent()
  },[]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data =new FormData();
    data.append('title', eventData.title);
    data.append('location', eventData.location);
    data.append('price', eventData.price);
    data.append('seats', eventData.seats);
    data.append('description', eventData.description);
    data.append('date', eventData.date);
    data.append('image', image);
    try {
      const res = await axios.post('http://localhost:5000/api/events/create', data);
      if (res.data.success) {
        alert("New Event Created Successfully!");
        setShowMoadal(true)
        fetchEvent();
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Event not created"));
    }
  };
    return (
    <div className="pt-32 px-10 min-h-screen bg-[#0a0a0a] text-white">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tight">Admin Panel</h1>
        <p className="text-zinc-500 mt-2">Manage your events and bookings here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Create New Event</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Event Title</label>
              <input 
                type="text" 
                required
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                placeholder="Event Title"
                onChange={(e) => setEventData({...eventData, title: e.target.value})}
              />
            </div>
              <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Event Location</label>
              <input 
                type="text" 
                required
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                placeholder="Enter location"
                onChange={(e) => setEventData({...eventData, location: e.target.value})}
              />
            </div>


            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Price ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none"
                  onChange={(e) => setEventData({...eventData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Total Seats</label>
                <input 
                  type="number" 
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none"
                  onChange={(e) => setEventData({...eventData, seats: e.target.value})}
                />
              </div>
                <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                placeholder="Event date "
                onChange={(e) => setEventData({...eventData, date: e.target.value})}
              />
            </div>
            <div>
              <textarea 
                required
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                placeholder="Description"
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
              ></textarea>
            </div>

            </div>
              <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Event Image</label>
              <input 
                type="file" 
                required
                className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none transition-all"
                placeholder="e.g. Tech Conference 2026"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>


            <button type="submit" className="w-full py-4 bg-white text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all mt-4">
              Publish Event
            </button>
          </form>
        </div>
        <SuccessModal isOpen={showModal} onClose={()=>setShowMoadal(false)}/>
        
<div className="mt-20">
  <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">Manage Live Events</h2>
  <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-zinc-800/50 text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
        <tr>
          <th className="p-6">Event Name</th>
          <th className="p-6">Price</th>
          <th className="p-6">location</th>
          <th className="p-6">Actions</th>
        </tr>
      </thead>
   <tbody className="divide-y divide-zinc-800">
              {allEvents.map((ev) => (
                <tr key={ev._id}>
                  <td className="p-6 font-bold">{ev.title}</td>
                  <td className="p-6 text-cyan-400">${ev.price}</td>
                  <td className='p-6 text-zinc-400'>{ev.location}</td>
                  <td className="p-6 text-zinc-400">{ev.availableSeats}</td>
                </tr>
              ))}
            </tbody>   
             </table>
           </div>
          </div>
        <div className="flex flex-col justify-center">
          <div className="border-l-2 border-zinc-800 pl-8">
            <h3 className="text-xl font-bold mb-4">Quick Instructions</h3>
            <ul className="text-zinc-500 space-y-4 text-sm">
              <li>• Fill all details to make the event live.</li>
              <li>• Total seats will be updated in real-time.</li>
              <li>• You can delete events from the 'Manage' section.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;