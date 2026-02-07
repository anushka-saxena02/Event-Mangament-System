import { useEffect, useState } from "react";
import{motion} from 'framer-motion'
import { Link } from "react-router-dom";


const Navbar = () => {
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 px-10 py-5 
        flex justify-between items-center ${
        isScrolled ? "bg-black/60 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <Link to="/" className="text-2xl font-black tracking-tighter uppercase">
        Book<span className="text-cyan-400">Event.</span>
      </Link>

      <div className="flex gap-8 items-center font-medium text-sm uppercase tracking-widest">
        <Link title="Browse upcoming events" to="/events" className="hover:text-cyan-400
         transition-colors">Events</Link>
      <Link to="/admin"  className="hover:text-cyan-400 transition-colors">Admin</Link>
       <Link to="/events" className="bg-white text-black px-6 py-2 rounded-full hover:bg-cyan-400 
        transition-all font-bold">
          Book Now
        
        </Link>
        
      </div>
    </motion.nav>
  );
};

export default Navbar;
