/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/eur2usd',
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    }
  }
})
