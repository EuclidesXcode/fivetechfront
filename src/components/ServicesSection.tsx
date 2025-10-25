import ServiceCard from "./ServiceCard";
import { services } from "../data/services";

export default function ServicesSection() {
  return (
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
  );
}