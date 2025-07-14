import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Updated configuration for dadacat-lambda-pipeline integration
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app2: resolve(__dirname, 'app2.html'),
        app3: resolve(__dirname, 'app3.html'),
        appDadaCat: resolve(__dirname, 'appDadaCat.html'),
      },
      output: {
        // Create separate chunks for better caching
        manualChunks: id => {
          if (id.includes('node_modules')) {
            // Separate the pipeline into its own chunk
            if (id.includes('dadacat-lambda-pipeline')) {
              return 'dadacat-pipeline';
            }
            // React and related libraries
            if (id.includes('react')) {
              return 'react-vendor';
            }
            // All other dependencies
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 1000,
  },
  // Pre-bundle the pipeline for faster dev server startup
  optimizeDeps: {
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom'],
  },
  // Define environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    // Add global if the package needs it
    global: 'globalThis',
  },
  // Development server configuration
  server: {
    proxy: {
      // Proxy API calls to Express backend during development
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Handle any Node.js polyfills if required by the package
  resolve: {
    alias: {
      // Add polyfills only if you get errors about missing Node.js modules
      // Uncomment these lines if needed:
      // 'stream': 'stream-browserify',
      // 'buffer': 'buffer',
      // 'util': 'util',
      // 'process': 'process/browser',
    },
  },
});
