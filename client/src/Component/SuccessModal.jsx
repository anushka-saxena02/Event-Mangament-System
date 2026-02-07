import React from 'react';
import { motion } from 'framer-motion';

const SuccessModal = ({ isOpen, onClose, message = "Operation Successful!" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h2 className="text-3xl font-black uppercase mb-2 text-white">Success!</h2>
        <p className="text-zinc-500 mb-8">{message}</p>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-white text-black font-black rounded-full uppercase tracking-widest hover:bg-cyan-400 transition-all"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;