import React from 'react'
import {  Route,   Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './pages/Home';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/AdminDashboard';
import BookingForm from './Component/BookingForm';

const App = () => {
  return (
      <div className="bg-[#0a0a0a] min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/events" element={<BookingForm/>}/>
        </Routes>
      </div>
      
    
  );
}
  

export default App
