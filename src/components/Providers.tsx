"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { AnimatePresence } from "framer-motion";
import { WebVitalsLogger } from "./WebVitalsLogger";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ParallaxProvider>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
      {process.env.NODE_ENV === "development" && <WebVitalsLogger />}
    </ParallaxProvider>
  );
}
