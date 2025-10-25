'use client';

import { useState } from 'react';
import dynamic from "next/dynamic";
import NeuralBackgroundLoader from "../components/NeuralBackgroundLoader";
import ServiceDetailModal from '../components/ServiceDetailModal';
import { services } from '../data/services';

const TechSection = dynamic(() => import("../components/TechSection"), {
  loading: () => <div className="h-96" />,
});

const ServicesSection = dynamic(() => import("../components/ServicesSection"), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isHiding, setIsHiding] = useState(false);

  const handleCardClick = (service: any) => {
    window.dispatchEvent(new CustomEvent('zoomToRandomNeuron'));
    setIsHiding(true);
    setTimeout(() => {
      setSelectedService(service);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    window.dispatchEvent(new CustomEvent('zoomOut'));
    setTimeout(() => {
      setIsHiding(false);
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NeuralBackgroundLoader />

      <main className={`transition-opacity duration-500 ${isHiding ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Five Tech
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transformando ideias em soluções digitais com expertise em
              desenvolvimento e consultoria.
            </p>
          </div>
        </section>

        <TechSection />

        <ServicesSection onCardClick={handleCardClick} />
      </main>

      {selectedService && (
        <ServiceDetailModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
}