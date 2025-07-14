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
        // Chunk React apps separately
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'dadacat-pipeline': ['dadacat-lambda-pipeline'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom'],
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
});
