"use client";

import { motion } from "framer-motion";
import React from "react";

interface LegalModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function LegalModal({ title, onClose, children }: LegalModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl max-h-[80vh] rounded-2xl border border-white/20 bg-gray-900/80 p-8 shadow-lg shadow-black/20 backdrop-blur-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="prose prose-invert max-w-none text-gray-300">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
