import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss({
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
  }), flowbiteReact()],
  server: {
    proxy: {
      // '/api/': "http://localhost:3000",
      '/api/': "https://test-portal-79im.onrender.com",
      // '/uploads/': "http://localhost:3000",
    }
  },
})