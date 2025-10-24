import Image from "next/image";
import ClientWrapper from "../components/ClientWrapper";
import NeuralBackground from "../components/NeuralBackground";
import { TechCard } from "../components/TechCard";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

export default function Home() {
  return (
    <ClientWrapper>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <NeuralBackground />
        
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

        {/* Tech Card Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <TechCard />
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Nossos Serviços
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </section>
      </div>
    </ClientWrapper>
  );
}
