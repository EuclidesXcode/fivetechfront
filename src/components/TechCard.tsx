"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const TechCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/2 shadow-lg shadow-black/10 transition-all hover:bg-white/8 overflow-hidden h-full"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image column: fills left side, flush to card edge on md+ */}
        <div className="md:w-1/2 w-full relative h-[260px] md:h-[400px] flex-shrink-0">
          <Image
            src="/images/fivetech-demo.jpeg"
            alt="Profissional Five Tech"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover w-full h-full md:rounded-l-2xl rounded-t-2xl md:rounded-r-none"
          />
        </div>

        {/* Content column */}
        <div className="md:w-1/2 p-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Inovação em Inteligência Artificial
          </h3>
          <p className="text-gray-300 mb-4">
            Na FiveTech, transformamos dados em decisões e tecnologia em resultados.
            Nossa equipe de especialistas cria soluções inteligentes sob medida, combinando
            IA, Machine Learning e Big Data para impulsionar o crescimento e a eficiência do seu negócio.
          </p>
          <p className="text-gray-300 mb-4">
            Automatizamos processos, prevemos comportamentos, identificamos oportunidades e desenvolvemos
            sistemas que aprendem e evoluem junto com a sua empresa.
          </p>
          <p className="text-gray-300 mb-4 font-semibold">Nossas especialidades:</p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-start">
              <span className="mr-3">🧠</span>
              <div>
                <strong>Machine Learning e Deep Learning</strong> — modelos preditivos que aprendem com seus dados e aumentam sua performance.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">💬</span>
              <div>
                <strong>Processamento de Linguagem Natural (NLP)</strong> — chatbots e assistentes virtuais com conversas humanas e contextualizadas.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">📊</span>
              <div>
                <strong>Análise Preditiva e Big Data</strong> — insights estratégicos para decisões rápidas, precisas e baseadas em dados.
              </div>
            </li>
          </ul>
          <p className="text-gray-300 mt-4">
            Da estratégia à execução, criamos soluções de IA que geram impacto real nos seus resultados.
          </p>
        </div>
      </div>
    </motion.div>
  );
};