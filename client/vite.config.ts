import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Resolve plotly.js/dist/plotly to the basic version
      'plotly.js/dist/plotly': 'plotly.js-basic-dist',
      'plotly.js': 'plotly.js-basic-dist',
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['fao-targets-dashboard-frontend.onrender.com']
  },
});
