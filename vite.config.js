import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev plugin: handles /api/gemini requests using the serverless handler
function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const { default: handler } = await server.ssrLoadModule('/src/components/Tarot/services/geminiHandler.js')
            const fakeReq = { method: 'POST', body: JSON.parse(body) }
            const fakeRes = {
              statusCode: 200,
              status(code) { this.statusCode = code; return this },
              json(data) {
                res.statusCode = this.statusCode
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
            }
            await handler(fakeReq, fakeRes)
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Make GEMINI env vars available to server-side code via process.env
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
  process.env.GEMINI_MODEL = env.GEMINI_MODEL || process.env.GEMINI_MODEL || ''
  process.env.NTFY_TOPIC = env.NTFY_TOPIC || process.env.NTFY_TOPIC || ''

  return {
    plugins: [react(), localApiPlugin()],
    optimizeDeps: {
      include: ['react-slick'],
    },
  }
})
