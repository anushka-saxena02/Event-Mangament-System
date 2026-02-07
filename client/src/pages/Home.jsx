import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative bg-[#0a0a0a] min-h-screen overflow-hidden">
      
  
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-linear-to-br from-cyan-200/20 
        to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-linear-to-tl from-purple-300/10 to-
        transparent blur-[120px]" />
      </div>

  
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-cyan-400 font-mono tracking-[0.3em] uppercase text-xs mb-4 block">
          Exclusive Access
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
            Book Your <br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-100 via-zinc-300 to-zinc-800">
              
            </span>
          </h1>

          <p className="mt-8 text-zinc-500 max-w-lg mx-auto text-lg">
          Manage reservations and discover upcoming experiences with real-time seat tracking.
          </p>

          <div className="mt-10 flex gap-4 justify-center">
           <Link to='/events'> <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all 
            uppercase text-sm tracking-widest">
        Explore Events
            </button>
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="py-20 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Active Events", value: "500+" },
            { label: "Tickets Sold", value: "100k+" },
            { label: "Verified Venues", value: "50+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <span className="text-5xl font-black text-white">{stat.value}</span>
              <span className="text-zinc-500 uppercase tracking-widest text-xs mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-black uppercase mb-16 italic">Trending <span className="text-cyan-400">Categories</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 0.98 }} className="h-400px bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden relative group p-10 flex items-end">
             <div className="z-10">
                <h3 className="text-3xl font-bold">Music Concerts</h3>
                <p className="text-zinc-500">Live performances by top artists.</p>
             </div>
             <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-80"></div>
          </motion.div>
          <motion.div whileHover={{ scale: 0.98 }} className="h-400px bg-cyan-400 rounded-[3rem] overflow-hidden relative p-10 flex items-end text-black">
             <div className="z-10">
                <h3 className="text-3xl font-bold">Tech Summits</h3>
                <p className="opacity-70 font-medium">Innovation and networking events.</p>
             </div>
          </motion.div>
        </div>
      </section>

    
      <footer className="py-20 border-t border-zinc-900 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <span className="text-2xl font-black tracking-tighter">BOOKEVENT<span className="text-cyan-400">.</span></span>
            <p className="text-zinc-600 mt-4 max-w-xs text-sm">The world's leading platform for event management and seamless ticket booking experience.</p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Pages</span>
              <Link to="/events" className="text-sm hover:text-cyan-400">Browse Events</Link>
              <Link to="/admin" className="text-sm hover:text-cyan-400">Admin Dashboard</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Social</span>
              <a href="#" className="text-sm hover:text-cyan-400">Instagram</a>
              <a href="#" className="text-sm hover:text-cyan-400">Twitter</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-zinc-900 text-center text-zinc-700 text-[10px] uppercase tracking-widest">
           © 2026 BOOKEVENT. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;