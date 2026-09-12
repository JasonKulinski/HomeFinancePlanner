import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev server proxies /api calls to the ASP.NET Core app so the React app
// can just fetch('/api/...') in both dev and production.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://localhost:5001',
    },
  },
  build: {
    outDir: '../wwwroot/dist',
    emptyOutDir: true,
  },
});
