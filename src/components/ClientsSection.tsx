import Image from 'next/image';

// Import client logos
import allianzLogo from '../assets/clients/logo-allianz.png';
import cetLogo from '../assets/clients/logo-cet.png';
import comgasLogo from '../assets/clients/logo-comgas.png';
import conviasLogo from '../assets/clients/logo-convias.jpeg';
import geoinfraLogo from '../assets/clients/logo-geo-infra.png';
import mitsubishiLogo from '../assets/clients/logo-mitsubishi.png';
import oswaldoCruzLogo from '../assets/clients/logo-osvaldo-cruz.jpeg';
import philipsLogo from '../assets/clients/logo-philips.jpg';
import manausLogo from '../assets/clients/logo-prefeitura-manaus.png';
import saoCamiloLogo from '../assets/clients/logo-sao-camilo.png';
import sirioLibanesLogo from '../assets/clients/logo-sirio-libanes.png';
import alvoradaLogo from '../assets/clients/logo-alvorada.png';
import bayerLogo from '../assets/clients/logo-bayer.svg';
import cpflLogo from '../assets/clients/logo-cpfl.png';
import energisaLogo from '../assets/clients/logo-energisa.jpg';
import hcLogo from '../assets/clients/logo-hc.png';
import hcorLogo from '../assets/clients/logo-hcor.png';
import seconciSpLogo from '../assets/clients/logo-seconci-sp.jpg';
import unimedLogo from '../assets/clients/logo-unimed.png';

const clients = [
  { name: 'Philips', logo: philipsLogo },
  { name: 'Hospital São Camilo', logo: saoCamiloLogo },
  { name: 'Hospital Sírio-Libanês', logo: sirioLibanesLogo },
  { name: 'Hospital Alemão Oswaldo Cruz', logo: oswaldoCruzLogo },
  { name: 'CET', logo: cetLogo },
  { name: 'Convias', logo: conviasLogo },
  { name: 'Geoinfra', logo: geoinfraLogo },
  { name: 'Comgás', logo: comgasLogo },
  { name: 'Prefeitura de Manaus', logo: manausLogo },
  { name: 'Allianz', logo: allianzLogo },
  { name: 'Mitsubishi Motors', logo: mitsubishiLogo },
  { name: 'Hospital das Clínicas BH', logo: hcLogo },
  { name: 'UNIMED', logo: unimedLogo },
  { name: 'Hospital Alvorada', logo: alvoradaLogo },
  { name: 'Seconci-SP', logo: seconciSpLogo },
  { name: 'Hospital HCOR', logo: hcorLogo },
  { name: 'ENERGISA', logo: energisaLogo },
  { name: 'CPFL', logo: cpflLogo },
  { name: 'Bayer', logo: bayerLogo },
];

const ClientsSection = () => {
  return (
    <section className="py-20 px-4 z-10">
      <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Alguns de nossos clientes
        </h2>
        <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-12 md:gap-x-12">
          {clients.map((client) => (
            <div key={client.name} className="flex flex-col items-center w-36">
              <div className="w-24 h-24 bg-white border-2 border-gray-700 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:border-blue-500">
                <Image 
                  src={client.logo} 
                  alt={`${client.name} Logo`} 
                  width={80} 
                  height={80} 
                  className="rounded-full object-contain p-1" 
                />
              </div>
              <p className="text-sm text-center text-gray-300">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
