"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

export default function ServiceCard({ title, description, icon, delay }: ServiceCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 bg-white/2 p-6 shadow-lg shadow-black/10 transition-all hover:bg-white/8"
    >
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
}
