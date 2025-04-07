import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:3001", // ✅ Correct backend port
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000, // Ensure the client runs on 3000
  },
  });

  
  // In the above configuration, we are setting up a proxy for the  /api  route. When the React frontend makes a request to  /api , Vite will forward the request to the backend server running on port 3001. 
  // Now, start the frontend server by running the following command: 
  // npm run dev
  
  // The frontend server will start on  http://localhost:3000 . 
