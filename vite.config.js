import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 8080,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        poems: resolve(__dirname, 'poems.html'),
        poem2: resolve(__dirname, 'poem2.html'),
        poem3: resolve(__dirname, 'poem3.html'),
        tsdadacat: resolve(__dirname, 'tsdadacat.html')
      },
      output: {
        // Chunk React apps separately
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('dadacat-lambda-pipeline')) {
              return 'dadacat-pipeline';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['dadacat-lambda-pipeline', 'react', 'react-dom']
  }
})