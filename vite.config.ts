import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Project site: https://kaveesl.github.io/ICODE2027/
  base: process.env.GITHUB_ACTIONS ? '/ICODE2027/' : '/',
  plugins: [react(), tailwindcss()],
})
