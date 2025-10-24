/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de imagens
  images: {
    domains: ['localhost'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Otimizações de compilação
  swcMinify: true,
  
  // Configuração do compilador
  compiler: {
    // Remover console.logs em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Configurações experimentais
  experimental: {
    // Otimização do carregamento de módulos
    optimizeCss: true,
    // Habilitar otimizações modernas
    modernBuild: true,
    // Compilação incremental
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
  },

  // Configuração do webpack
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas para produção
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        // Dividir chunks
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 50000,
          cacheGroups: {
            defaultVendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
        // Minimizar apenas em produção
        minimize: true,
      }
    }

    return config
  },

  // Configurações de runtime
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig