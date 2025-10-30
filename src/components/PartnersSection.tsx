import Image from 'next/image';
import { useState, useEffect } from 'react';

// Import partner logos
import appleLogo from '../assets/partners/logo-apple.webp';
import awsLogo from '../assets/partners/logo-aws.png';
import azureLogo from '../assets/partners/logo-azure.png';
import firebaseLogo from '../assets/partners/logo-firebase.png';
import gcpLogo from '../assets/partners/logo-gcp.png';
import supabaseLogo from '../assets/partners/logo-supabase.jpg';
import sysaidLogo from '../assets/partners/logo-sysaid.jpg';
import vercelLogo from '../assets/partners/logo-vercel.png';

const partners = [
  { name: 'Apple', logo: appleLogo },
  { name: 'AWS', logo: awsLogo },
  { name: 'Microsoft Azure', logo: azureLogo },
  { name: 'Firebase', logo: firebaseLogo },
  { name: 'Google Cloud', logo: gcpLogo },
  { name: 'Supabase', logo: supabaseLogo },
  { name: 'SysAid', logo: sysaidLogo },
  { name: 'Vercel', logo: vercelLogo },
];

const PartnersSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 z-10">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Alguns de nossos Parceiros
        </h2>
      </div>

      {isMounted && (
        <div className="scroller">
          <ul className="scroller__inner">
            {duplicatedPartners.map((partner, index) => (
              <li key={`${partner.name}-${index}`}>
                <div className="flex flex-col items-center w-40">
                  <div className="w-24 h-24 bg-white border-2 border-gray-700 rounded-full flex items-center justify-center mb-3 transition-all duration-300 hover:border-cyan-500 p-2">
                    <Image 
                      src={partner.logo} 
                      alt={`${partner.name} Logo`} 
                      width={60} 
                      height={60} 
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-center text-white">{partner.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .scroller {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);
        }
        .scroller__inner {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .scroller__inner li {
          margin: 0 2rem; /* 32px */
          flex-shrink: 0;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;