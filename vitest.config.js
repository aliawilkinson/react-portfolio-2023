import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./tests/setup.js'],
    projects: [
      {
        test: {
          name: 'fast',
          include: ['tests/**/*.fast.test.{js,jsx}'],
          environment: 'jsdom',
          setupFiles: ['./tests/setup.js'],
        }
      },
      {
        test: {
          name: 'full',
          include: ['tests/**/*.{test,fast.test,property.test}.{js,jsx}'],
          environment: 'jsdom',
          setupFiles: ['./tests/setup.js'],
        }
      }
    ]
  }
})
