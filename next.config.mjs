/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Verificar cambios cada 1 segundo
        aggregateTimeout: 300, // Retrasar la recarga en 300ms
      };
    }
    return config;
  },
};

export default (nextConfig);