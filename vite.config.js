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
        // Optimized chunking for faster corruption
        manualChunks: (id) => {
          // React vendor bundle
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          
          // DadaCat pipeline bundle
          if (id.includes('dadacat-lambda-pipeline')) {
            return 'dadacat-pipeline';
          }
          
          // Core TECHNODADA context and hooks
          if (id.includes('src/contexts/') || id.includes('src/hooks/')) {
            return 'technodada-core';
          }
          
          // Optimized components bundle
          if (id.includes('src/components/Optimized')) {
            return 'optimized-components';
          }
          
          // Regular components
          if (id.includes('src/components/')) {
            return 'components';
          }
          
          // App-specific bundles
          if (id.includes('src/apps/AppDadaCat')) {
            return 'app-dadacat';
          }
          if (id.includes('src/apps/')) {
            return 'apps';
          }
          
          // Utilities and smaller dependencies
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
        },
        
        // Asset file naming with chaos
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
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
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom'],
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
});
