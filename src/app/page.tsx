import dynamic from "next/dynamic";
import NeuralBackgroundLoader from "../components/NeuralBackgroundLoader";

const TechSection = dynamic(() => import("../components/TechSection"), {
  loading: () => <div className="h-96" />,
});

const ServicesSection = dynamic(() => import("../components/ServicesSection"), {
  loading: () => <div className="h-96" />,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <NeuralBackgroundLoader />

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

      <ServicesSection />
    </div>
  );
}

