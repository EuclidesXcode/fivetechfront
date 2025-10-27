"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
  onClick: () => void;
}

export default function ServiceCard({ title, description, icon, delay, onClick }: ServiceCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [spot, setSpot] = useState<{ x: number; y: number; visible: boolean; angle: number }>({ x: -100, y: -100, visible: false, angle: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // defer setting mounted to the next animation frame to avoid
    // triggering a synchronous state update during SSR hydration.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // compute angle between center and cursor to orient streak lines like a compass
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
    setSpot({ x, y, visible: true, angle });
  };

  const handleMouseLeave = () => {
    setSpot((s) => ({ ...s, visible: false }));
  };

  const overlayStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.6) 6%, rgba(255,255,255,0.28) 14%, rgba(255,255,255,0.08) 24%, transparent 36%)`,
    opacity: spot.visible ? 1 : 0,
    transition: "opacity 160ms ease, background-position 30ms linear",
    mixBlendMode: 'screen',
  };

  const specularStyle: React.CSSProperties = {
    position: 'absolute',
    left: Math.max(0, spot.x - 12),
    top: Math.max(0, spot.y - 12),
    width: 28,
    height: 28,
    borderRadius: 9999,
    background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.0) 60%)',
    filter: 'blur(4px)',
    opacity: spot.visible ? 1 : 0,
    transition: 'transform 30ms linear, opacity 120ms ease',
    transform: `translate(0px, 0px)`,
    pointerEvents: 'none' as const,
    mixBlendMode: 'screen' as const,
  };

  // thinner cross streaks that follow the mouse; two rotated lines form a 4-directional cross
  const streakWidth = 250;
  const streakHeight = 10; // ~50% thinner than before

  const baseStreakStyle: React.CSSProperties = {
    position: 'absolute',
    left: Math.max(0, spot.x - streakWidth / 2),
    top: Math.max(0, spot.y - streakHeight / 2),
    width: streakWidth,
    height: streakHeight,
    background: 'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.35) 55%, rgba(255,255,255,0.0) 100%)',
    filter: 'blur(5px)',
    opacity: spot.visible ? 0.95 : 0,
    transition: 'opacity 120ms ease, transform 50ms linear',
    pointerEvents: 'none' as const,
    mixBlendMode: 'screen' as const,
    borderRadius: 9999,
    transformOrigin: 'center center',
  };

  const streakStyle1: React.CSSProperties = {
    ...baseStreakStyle,
    transform: `rotate(${spot.angle}deg)`,
  };

  const streakStyle2: React.CSSProperties = {
    ...baseStreakStyle,
    transform: `rotate(${spot.angle + 90}deg)`,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
  onClick={onClick}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  className="cursor-pointer rounded-2xl border border-white/10 bg-white/2 p-6 shadow-lg shadow-black/5 transition-all relative overflow-hidden"
    >
      {mounted && (
        <>
          <div className="pointer-events-none absolute inset-0 z-20" style={overlayStyle} />
          <div className="pointer-events-none absolute z-20" style={specularStyle} />
            <div className="pointer-events-none absolute z-20" style={streakStyle1} />
            <div className="pointer-events-none absolute z-20" style={streakStyle2} />
        </>
      )}
      <div className="relative z-10 h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
}
