import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/graph': {
        target: process.env.BACKEND_API_ENDPOINT || 'http://qstand.art:8034/',
        // target: process.env.BACKEND_API_ENDPOINT || 'https://phytolex.eusp.org/',
        changeOrigin: true,
      }
    }
  },
})
