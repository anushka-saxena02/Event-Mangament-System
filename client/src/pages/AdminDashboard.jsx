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
  const[isEditing,setIsEditing]=useState(false);
  const[editId,setEditId]=useState(null);
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

  
    const handleEdit =(ev)=>{
    setEventData({
      title:ev.title,
      location:ev.location,
      price:ev.price,
      seats:ev.seats,
      description:ev.description,
      date:ev.date.split('T')[0],
      image:ev.image
    
      
    })
    setIsEditing(true)
    setEditId(ev._id);
    window.scrollTo({top:0,behavior:'smooth'})
  }
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
    try{
      let res;
      if(isEditing){
        res = await axios.put(`http://localhost:5000/api/events/update/${editId}`,data)
      }else{
        res=await axios.post("http://localhost:5000/api/events/create",data)
      }
      if(res.data.success){
        alert(isEditing ? "Event Updated is successfully..!":"New Event is created ..!")
        setIsEditing(false)
        setEditId(null);
        setEventData({title:"",location:"",price:"",seats:"",description:"", date:""})
        setImage(null);
        fetchEvent()
      }
    }catch(err){
       window("Event update is failed")
    }
  };
  const handleDelete=async(id)=>{
    if(window.confirm("Are You sure you want to delete this event...!"))
      try{
    const res=await axios.delete(`http://localhost:5000/api/events/delete/${id}`);
    if(res.data.success){
      alert("Event deleted successfully...!")
      fetchEvent();
    }
    }catch(err){
      alert("Error:" ,+(err.response?.data?.message || "Delete Failed") )
    }

  }
  
    return (
    <div className="pt-32 px-10 min-h-screen bg-[#0a0a0a] text-white">
      <div className="mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tight">Admin Panel</h1>
        <p className="text-zinc-500 mt-2">Manage your events and bookings here.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">{isEditing?"Upadte Event Details" :"Create Event"}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Event Title</label>
              <input 
                type="text" 
                value={eventData.title}
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
                value={eventData.location}
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
                  value={eventData.price}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none"
                  onChange={(e) => setEventData({...eventData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Total Seats</label>
                <input 
                  type="number"
                  value={eventData.seats}
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl focus:border-cyan-500 outline-none"
                  onChange={(e) => setEventData({...eventData, seats: e.target.value})}
                />
              </div>
                <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Date</label>
              <input 
                type="date" 
                required
                value={eventData.date}
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
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
              ></textarea>
            </div>

            </div>
              <div>
              <label className="text-xs uppercase tracking-widest text-zinc-500 block mb-2">Event Image</label>
            
                  <div className="flex gap-4 items-end mb-4">
                   {isEditing && !image && eventData.image && (
                    <div>
                  <label className="text-[10px] text-zinc-500 uppercase mb-2 block">Current Image</label>
                        <img src={`http://localhost:5000/uploads/${eventData.image}`} className="w-20 h-20 object-cover rounded-lg border border-zinc-800"alt="Old"     />
                        </div>
                               )}
                         {image && (
                          <div>
                        <label className="text-[10px] text-cyan-400 uppercase mb-2 block">New Selection</label>
                         <img src={URL.createObjectURL(image)} className="w-20 h-20 object-cover rounded-lg border border-cyan-400"alt="New"/>
                         </div>
                              )}
                          </div>
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
          <th className="p-6">Available Seats</th>
          <th className='p-6'>Action</th>
        </tr>
      </thead>
   <tbody className="divide-y divide-zinc-800">
              {allEvents.map((ev) => (
                <tr key={ev._id}>
                  <td className="p-6 font-bold">{ev.title}</td>
                  <td className="p-6 text-cyan-400">${ev.price}</td>
                  <td className='p-6 text-zinc-400'>{ev.location}</td>
                  <td className="p-6 text-zinc-400">{ev.availableSeats}</td>
                  <td className='p-6 '>
                    <div className='flex gap-3'>
                    <button onClick={()=>handleEdit(ev)} className='px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500
                    hover:text-white transition-all text-xs font-bold'>EDIT</button>
                  <button onClick={()=>handleDelete(ev._id)} className='px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500
                    hover:text-white transition-all text-xs font-bold'>DELETE</button>
                    </div>
                  </td>
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