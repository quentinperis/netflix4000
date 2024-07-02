import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'gzip', // ou 'brotliCompress'
      ext: '.gz', // ou '.br' pour Brotli
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
});

// En activant la compression, vous pouvez réduire considérablement la taille des fichiers transférés et améliorer les performances de chargement de votre application. Les méthodes ci-dessus couvrent les configurations pour les serveurs les plus courants (Node.js avec Express, Nginx, Apache) ainsi que l'utilisation de Vite pour générer des fichiers compressés lors du build.

