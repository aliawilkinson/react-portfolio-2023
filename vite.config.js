import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePrerender from 'vite-plugin-prerender'

const PuppeteerRenderer = vitePrerender.PuppeteerRenderer

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(import.meta.dirname, 'dist'),
      routes: [
        '/',
        '/about',
        '/releaseofreleases',
        '/iacPipelineValidation',
        '/amplifyReactMigApp',
        '/cmdletCreationTemplate',
        '/agenticWorkflowApp',
        '/cognitoIdentityArchitecture',
        '/almModernization',
      ],
      renderer: new PuppeteerRenderer({
        headless: true,
        renderAfterTime: 3000,
      }),
    }),
  ],
  optimizeDeps: {
    include: ['react-slick'],
  },
})
