"use client";

import { useEffect, useRef } from 'react';

export const Logo = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Animação dos pontos e linhas
    const points = svgRef.current.querySelectorAll('.neural-point');
    points.forEach((point) => {
      point.animate(
        [
          { opacity: 0.3 },
          { opacity: 1 },
          { opacity: 0.3 },
        ],
        {
          duration: 2000,
          iterations: Infinity,
          delay: Math.random() * 2000,
        }
      );
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 200"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffff" />
          <stop offset="50%" stopColor="#8000ff" />
          <stop offset="100%" stopColor="#ff00ff" />
        </linearGradient>
      </defs>

      {/* Pontos da rede neural */}
      <g className="neural-network">
        {/* Lado esquerdo - tons de ciano */}
        <circle className="neural-point" cx="100" cy="50" r="3" fill="#00ffff" />
        <circle className="neural-point" cx="80" cy="80" r="3" fill="#00ffff" />
        <circle className="neural-point" cx="120" cy="100" r="3" fill="#00ffff" />
        <circle className="neural-point" cx="90" cy="120" r="3" fill="#00ffff" />
        
        {/* Lado direito - tons de magenta */}
        <circle className="neural-point" cx="400" cy="50" r="3" fill="#ff00ff" />
        <circle className="neural-point" cx="380" cy="80" r="3" fill="#ff00ff" />
        <circle className="neural-point" cx="420" cy="100" r="3" fill="#ff00ff" />
        <circle className="neural-point" cx="390" cy="120" r="3" fill="#ff00ff" />

        {/* Linhas de conexão */}
        <path
          d="M100 50 L380 80 M80 80 L420 100 M120 100 L390 120 M90 120 L400 50"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* Letra F estilizada */}
      <path
        d="M150 40 
           L250 40 
           L250 70 
           L180 70 
           L180 90 
           L230 90 
           L230 120 
           L180 120 
           L180 160 
           L150 160 Z"
        fill="url(#logoGradient)"
        opacity="0.9"
      />

      {/* Texto FIVETECH */}
      <text
        x="50%"
        y="90%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
        className="logo-text"
      >
        FIVETECH
      </text>

      <text
        x="50%"
        y="95%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        className="logo-subtitle"
      >
        SOLUÇÕES EM TECNOLOGIA
      </text>
    </svg>
  );
};