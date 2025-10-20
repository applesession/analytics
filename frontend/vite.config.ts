import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: (process.env.VITE_HOST as string) ?? '0.0.0.0',
    port: parseInt(process.env.VITE_PORT as string) ?? 5173,
    watch: {
      usePolling: true,
    },
  },
});
