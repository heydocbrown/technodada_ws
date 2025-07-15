import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 8080,
    host: true,
  },
  preview: {
    port: 8080,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        poems: resolve(__dirname, 'poems.html'),
        poem2: resolve(__dirname, 'poem2.html'),
        poem3: resolve(__dirname, 'poem3.html'),
        tsdadacat: resolve(__dirname, 'tsdadacat.html'),
      },
      output: {
        // Asset file naming with chaos
        assetFileNames: assetInfo => {
          const fileName = assetInfo.names?.[0] || assetInfo.name || '';
          const info = fileName.split('.');
          const ext = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/chaos-images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/reality-styles/[name]-[hash][extname]`;
          }
          return `assets/void-assets/[name]-[hash][extname]`;
        },

        // Chunk file naming
        chunkFileNames: 'assets/entropy-chunks/[name]-[hash].js',
        entryFileNames: 'assets/consciousness/[name]-[hash].js',
      },
    },
  },
  optimizeDeps: {
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom', 'scheduler'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'], // Ensure single React instance
  },
});
