/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Support SCSS
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Désactiver l'optimisation d'image pour les images statiques si nécessaire
  images: {
    unoptimized: false,
  },
  // Configuration pour le déploiement statique si nécessaire
  output: 'export',
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig

