'use client';

import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-8 shadow-lg shadow-black/20 backdrop-blur-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the modal itself
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          &times;
        </button>
        <div className="text-6xl mb-6 text-center">{service.icon}</div>
        <h2 className="text-3xl font-bold mb-4 text-center">{service.title}</h2>
        <p className="text-gray-200 text-center text-lg mb-4">{service.description}</p>
        <p className="text-gray-400 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </motion.div>
    </motion.div>
  );
}
