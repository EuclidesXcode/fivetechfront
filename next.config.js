/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Imagens: usar public/ para assets locais. Mantenha remoto apenas se necessário.
  images: {
    // mantenha minimal: use public/images/* e evite domains desnecessários
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Evita erro do Turbopack quando há custom webpack
  // Mantemos uma config vazia para turbopack (silencia o aviso)
  turbopack: {},

  // Não declarar 'webpack' customizado aqui enquanto usar Turbopack.
  // Se precisar de custom webpack: execute dev com --webpack ou remova turbopack.
};

module.exports = nextConfig;