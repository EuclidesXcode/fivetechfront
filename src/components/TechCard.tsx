"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const TechCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative h-[300px] md:h-[400px]">
          <Image
            src="/images/fivetech-demo.jpeg"
            alt="Profissional Five Tech"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Inovação em Inteligência Artificial
          </h3>
          <p className="text-gray-300 mb-6">
            Nossa equipe de especialistas desenvolve soluções avançadas em IA, 
            combinando expertise técnica com visão estratégica. Transformamos 
            dados em insights acionáveis, automatizamos processos complexos e 
            criamos sistemas inteligentes que evoluem com seu negócio.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <span className="mr-2">🤖</span>
              Machine Learning e Deep Learning
            </li>
            <li className="flex items-center">
              <span className="mr-2">🔍</span>
              Processamento de Linguagem Natural
            </li>
            <li className="flex items-center">
              <span className="mr-2">📊</span>
              Análise Preditiva e Big Data
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};