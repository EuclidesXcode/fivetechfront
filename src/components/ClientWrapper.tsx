"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { motion, AnimatePresence } from "framer-motion";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ParallaxProvider>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </ParallaxProvider>
  );
}