import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,           // React frontend runs on port 3000
    host: '127.0.0.1',
    open: true,           // Automatically opens browser
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Backend API runs on port 3001
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
  
  // In the above configuration, we are setting up a proxy for the  /api  route. When the React frontend makes a request to  /api , Vite will forward the request to the backend server running on port 3001. 
  // Now, start the frontend server by running the following command: 
  // npm run dev
  
  // The frontend server will start on  http://localhost:3000 . 
