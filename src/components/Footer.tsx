"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import LegalModal from "./LegalModal";

const PrivacyPolicyText = () => (
  <>
    <p className="mb-4">Última atualização: 27 de outubro de 2025</p>
    <p className="mb-4">A sua privacidade é importante para nós. É política da FiveTech respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site FiveTech, e outros sites que possuímos e operamos.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">1. Coleta de Dados</h3>
    <p className="mb-4">Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">2. Uso de Dados</h3>
    <p className="mb-4">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">3. Links Externos</h3>
    <p className="mb-4">O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
    <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
  </>
);

const TermsOfUseText = () => (
  <>
    <p className="mb-4">Última atualização: 27 de outubro de 2025</p>
    <h3 className="text-xl font-bold mt-6 mb-4">1. Termos</h3>
    <p className="mb-4">Ao acessar ao site FiveTech, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">2. Uso de Licença</h3>
    <p className="mb-4">É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site FiveTech , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: modificar ou copiar os materiais; usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</p>
    <h3 className="text-xl font-bold mt-6 mb-4">3. Limitações</h3>
    <p className="mb-4">Em nenhum caso o FiveTech ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em FiveTech, mesmo que FiveTech ou um representante autorizado da FiveTech tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.</p>
  </>
);


export default function Footer() {
  const [modalContent, setModalContent] = useState<"terms" | "privacy" | null>(null);
  const phoneNumber = "5511934241132";
  const message = "Olá! Gostaria de mais informações sobre os serviços da FiveTech.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const openModal = (type: "terms" | "privacy") => setModalContent(type);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer className="bg-gray-900/90 text-white border-t border-white/10 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand and Info */}
            <div className="flex flex-col">
              <Link href="/" className="mb-4">
                <Image src="/images/logo-sem-fundo.png" alt="FiveTech Logo" width={150} height={40} />
              </Link>
              <p className="text-gray-400 text-sm">
                Rua Efraim, 250 - Bela Vista<br />
                São Paulo - SP, Brasil
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.instagram.com/fivetechsolucoesemtecnologia?igsh=MWd0ZWFmZHd4cDZxZQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="font-bold text-lg mb-4">Nossos Serviços</h3>
              <ul className="space-y-2">
                {services.slice(0, 6).map((service) => (
                  <li key={service.title}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{service.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:comercial@fivetechsolutions.com.br" className="text-gray-400 hover:text-white transition-colors">
                    <span className="font-semibold">Comercial:</span> comercial@fivetechsolutions.com.br
                  </a>
                </li>
                <li>
                  <a href="mailto:suporte@fivetechsolutions.com.br" className="text-gray-400 hover:text-white transition-colors">
                    <span className="font-semibold">Suporte:</span> suporte@fivetechsolutions.com.br
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => openModal("terms")} className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </button>
                </li>
                <li>
                  <button onClick={() => openModal("privacy")} className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidade
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} FiveTech Soluções em Tecnologia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {modalContent && (
        <LegalModal
          title={modalContent === "terms" ? "Termos de Uso" : "Política de Privacidade"}
          onClose={closeModal}
        >
          {modalContent === "terms" ? <TermsOfUseText /> : <PrivacyPolicyText />}
        </LegalModal>
      )}
    </>
  );
}
