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
  // comment these lines while deploying to production
  // server: {
  //   proxy: {
  //     '/api/': "http://localhost:3000",
  //     // '/uploads/': "http://localhost:3000",
  //   }
  // },

})