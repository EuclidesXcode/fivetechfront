"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import LegalModal from "./LegalModal";
import { InstagramIcon } from "./icons/InstagramIcon";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { GeckoIcon } from "./icons/GeckoIcon";

// Text components remain the same...
const PrivacyPolicyText = () => (
  <>
    <p className="mb-4 text-sm text-gray-400">Última atualização: 28 de outubro de 2025</p>
    <p className="mb-4">A FiveTech Soluções em Tecnologia ("FiveTech", "nós") tem o compromisso de proteger a privacidade dos visitantes do nosso site e de nossos clientes. Esta Política de Privacidade descreve os tipos de informações que coletamos, como as usamos e as medidas que tomamos para protegê-las.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">1. Informações que Coletamos</h3>
    <p className="mb-2">Podemos coletar as seguintes informações:</p>
    <ul className="list-disc list-inside mb-4 space-y-2">
      <li><strong>Informações Fornecidas Voluntariamente:</strong> Nome, endereço de e-mail, número de telefone, nome da empresa e qualquer outra informação que você nos forneça ao entrar em contato conosco através de nossos e-mails (comercial@ e suporte@) ou WhatsApp.</li>
      <li><strong>Informações Coletadas Automaticamente:</strong> Dados de uso do site, como endereço IP, tipo de navegador, páginas visitadas e horários de acesso. Utilizamos cookies e tecnologias semelhantes para coletar essas informações a fim de melhorar a sua experiência em nosso site.</li>
    </ul>
    <h3 className="text-xl font-bold mt-6 mb-4">2. Como Usamos Suas Informações</h3>
    <p className="mb-2">As informações coletadas são utilizadas para:</p>
    <ul className="list-disc list-inside mb-4 space-y-2">
      <li>Responder às suas solicitações de informações, orçamentos e suporte.</li>
      <li>Fornecer e aprimorar nossos serviços de consultoria e desenvolvimento.</li>
      <li>Analisar o uso do site para otimizar o conteúdo e a performance.</li>
      <li>Cumprir obrigações legais e regulatórias.</li>
    </ul>
    <h3 className="text-xl font-bold mt-6 mb-4">3. Compartilhamento de Dados</h3>
    <p className="mb-4">Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Suas informações podem ser compartilhadas com parceiros de serviços (como provedores de hospedagem) apenas quando necessário para a prestação de nossos serviços, ou conforme exigido por lei.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">4. Seus Direitos</h3>
    <p className="mb-4">Você tem o direito de solicitar o acesso, correção ou exclusão de suas informações pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail <a href="mailto:suporte@fivetechsolutions.com.br" className="text-cyan-400 hover:underline">suporte@fivetechsolutions.com.br</a>.</p>
  </>
);

const TermsOfUseText = () => (
  <>
    <p className="mb-4 text-sm text-gray-400">Última atualização: 28 de outubro de 2025</p>
    <h3 className="text-xl font-bold mt-6 mb-4">1. Aceitação dos Termos</h3>
    <p className="mb-4">Ao acessar e utilizar o site da FiveTech Soluções em Tecnologia ("Site"), você concorda em cumprir e estar vinculado a estes Termos de Uso e a todas as leis e regulamentos aplicáveis. Se você não concordar com estes termos, não está autorizado a usar o site.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">2. Propriedade Intelectual</h3>
    <p className="mb-4">Todo o conteúdo presente neste Site, incluindo textos, gráficos, logos, ícones, imagens e a compilação de tal conteúdo, é propriedade da FiveTech ou de seus fornecedores de conteúdo e protegido pelas leis de direitos autorais. As marcas e logos de clientes exibidos no site são propriedade de seus respectivos donos.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">3. Uso do Site</h3>
    <p className="mb-2">É concedida a você uma licença limitada para acessar e fazer uso pessoal e não comercial do Site. Você não pode:</p>
    <ul className="list-disc list-inside mb-4 space-y-2">
      <li>Modificar, copiar ou fazer uso derivado de qualquer conteúdo do Site.</li>
      <li>Utilizar mineração de dados, robôs ou métodos semelhantes de coleta e extração de dados.</li>
      <li>Usar o Site para qualquer finalidade ilegal ou não autorizada.</li>
    </ul>
    <h3 className="text-xl font-bold mt-6 mb-4">4. Limitação de Responsabilidade</h3>
    <p className="mb-4">O Site e seu conteúdo são fornecidos "como estão". A FiveTech não oferece garantias, expressas ou implícitas, sobre a operacionalidade do Site ou sobre as informações, conteúdos ou materiais incluídos. Em nenhuma circunstância a FiveTech será responsável por quaisquer danos decorrentes do uso deste Site.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">5. Lei Aplicável</h3>
    <p className="mb-4">Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil.</p>
  </>
);

const CuriosityText = () => (
  <>
    <p className="mb-4 text-sm text-gray-400">Uma espiada em nossa arte generativa.</p>
    <p className="mb-4">O plano de fundo que você vê não é um vídeo, mas uma obra de arte generativa e interativa, renderizada em tempo real no seu navegador usando WebGL e a biblioteca Three.js. Ela representa a forma como vemos a tecnologia: uma rede viva, complexa e em constante evolução.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">Arquitetura da Rede</h3>
    <p className="mb-2">A rede é composta por três elementos principais:</p>
    <ul className="list-disc list-inside mb-4 space-y-2">
      <li><strong>Neurônios:</strong> Os nós brilhantes (esferas) que formam a base da estrutura. Eles são gerados processualmente em um espaço 3D, garantindo que a rede seja única a cada visita.</li>
      <li><strong>Sinapses:</strong> As linhas que conectam os neurônios. Um algoritmo verifica a distância entre os neurônios e cria uma conexão se estiverem próximos o suficiente, formando uma teia complexa.</li>
      <li><strong>Partículas de Dados:</strong> Os pontos de luz que viajam pelas sinapses. Eles simulam o fluxo de informação e são o que torna a rede "viva".</li>
    </ul>
    <h3 className="text-xl font-bold mt-6 mb-4">Lógica e Complexidade</h3>
    <p className="mb-4">A complexidade da rede é governada por um algoritmo de evolução. Quando uma partícula de dados chega a um neurônio, ela aumenta um "contador de informação". Ao atingir um certo limite, esse neurônio dispara um evento que cria um novo neurônio em um ponto aleatório da rede.</p>
    <p className="mb-4">Para manter o equilíbrio, o sistema tem um limite máximo de 100 neurônios. Se esse limite for atingido, o neurônio mais antigo é removido para dar lugar ao novo. Além disso, o limite de informação necessário para criar um novo neurônio aumenta a cada nascimento, tornando o crescimento da rede mais lento e orgânico ao longo do tempo.</p>
    <h3 className="text-xl font-bold mt-6 mb-4">Interatividade</h3>
    <p className="mb-4">A rede reage a você. A rotação é controlada pela sua rolagem na página. Ao clicar em um de nossos serviços, a câmera dá um zoom em um neurônio aleatório, oferecendo um "tour" pelo interior da estrutura. É a nossa forma de mostrar que, por trás de cada serviço, existe um universo de tecnologia complexa e interconectada.</p>
  </>
);

export default function Footer() {
  const [modalContent, setModalContent] = useState<"terms" | "privacy" | "curiosity" | null>(null);

  const phoneNumber = "5511934241132";
  const message = "Olá! Gostaria de mais informações sobre os serviços da FiveTech.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const openModal = (type: "terms" | "privacy" | "curiosity") => setModalContent(type);
  const closeModal = () => setModalContent(null);

  return (
    <>
      <footer className="bg-gray-900/90 text-white border-t border-white/10 backdrop-blur-lg relative">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Brand and Info */}
            <div className="flex flex-col">
              <Link href="/" className="mb-4">
                <Image src="/images/logo-sem-fundo.png" alt="FiveTech Logo" width={150} height={40} />
              </Link>
              <p className="text-gray-400 text-sm">
                Rua Joaquim Bueno 1397<br />
                Campinas - São Paulo
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://www.instagram.com/fivetechsolucoesemtecnologia?igsh=MWd0ZWFmZHd4cDZxZQ==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <WhatsAppIcon className="h-6 w-6" />
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
            <p className="mt-2">CNPJ: 47.793.601/0001-62</p>
          </div>
        </div>
        
        <button 
          onClick={() => openModal("curiosity")} 
          style={{ position: 'absolute', bottom: '100px', right: '100px' }}
          className=""
          aria-label="Curiosidade"
        >
          <GeckoIcon className="h-8 w-8" style={{marginRight: "75px", marginBottom: "75px"}} />
        </button>

      </footer>

      {modalContent && (
        <LegalModal
          title={
            modalContent === "terms" ? "Termos de Uso" :
            modalContent === "privacy" ? "Política de Privacidade" :
            "Curiosidade: Nossa Rede Neural Interativa"
          }
          onClose={closeModal}
        >
          {
            modalContent === "terms" ? <TermsOfUseText /> :
            modalContent === "privacy" ? <PrivacyPolicyText /> :
            <CuriosityText />
          }
        </LegalModal>
      )}
    </>
  );
}
