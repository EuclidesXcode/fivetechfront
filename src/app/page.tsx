'use client';

import { useState } from 'react';
import dynamic from "next/dynamic";
import Image from 'next/image';
import NeuralBackgroundLoader from "../components/NeuralBackgroundLoader";
import ServiceDetailModal from '../components/ServiceDetailModal';
import { services } from '../data/services';
import { useUI } from '@/context/UIContext';

const TechSection = dynamic(() => import("../components/TechSection"), {
  loading: () => <div className="h-96" />,
});

const ServicesSection = dynamic(() => import("../components/ServicesSection"), {
  loading: () => <div className="h-96" />,
});

const ClientsSection = dynamic(() => import("../components/ClientsSection"), {
  loading: () => <div className="h-96" />,
});

const PartnersSection = dynamic(() => import("../components/PartnersSection"), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isHiding, setIsHiding] = useState(false);
  const { isNeuralViewActive, toggleNeuralView } = useUI();

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

      {!isNeuralViewActive && (
        <main className={`relative z-10 transition-opacity duration-500 ${isHiding ? 'opacity-0' : 'opacity-100'}`}>
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Image
                src="/images/logo-sem-fundo.png"
                alt="Five Tech Logo"
                width={400}
                height={100}
                priority
                className="[clip-path:inset(50px_0_50px_0)] mx-auto"
              />
            </div>
          </section>

          <TechSection />

          <ServicesSection onCardClick={handleCardClick} />

          <ClientsSection />

          <PartnersSection />
        </main>
      )}

      {isNeuralViewActive && (
        <button
          onClick={toggleNeuralView}
          className="absolute top-8 right-8 text-white text-5xl z-50"
          aria-label="Fechar visualização da rede neural"
        >
          &times;
        </button>
      )}

      {selectedService && (
        <ServiceDetailModal service={selectedService} onClose={handleCloseModal} />
      )}
    </div>
  );
}
