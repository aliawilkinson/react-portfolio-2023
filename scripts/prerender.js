import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '..', 'dist');

const routes = [
  '/',
  '/about',
  '/releaseofreleases',
  '/iacPipelineValidation',
  '/amplifyReactMigApp',
  '/cmdletCreationTemplate',
  '/agenticWorkflowApp',
  '/cognitoIdentityArchitecture',
  '/almModernization',
];

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function startStaticServer(port) {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let filePath = resolve(distDir, req.url === '/' ? 'index.html' : req.url.slice(1));

      // SPA fallback: if no extension and file doesn't exist, serve index.html
      if (!extname(filePath) && !existsSync(filePath)) {
        filePath = resolve(distDir, 'index.html');
      }
      if (!extname(filePath)) {
        filePath = resolve(distDir, 'index.html');
      }

      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const ext = extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });

    server.listen(port, () => {
      resolvePromise(server);
    });
  });
}

async function prerender() {
  const port = 4936;
  const origin = `http://localhost:${port}`;

  console.log('Starting static server...');
  const server = await startStaticServer(port);
  console.log(`Static server running at ${origin}`);

  const browser = await puppeteer.launch({ headless: true });

  for (const route of routes) {
    const url = `${origin}${route}`;
    console.log(`Pre-rendering: ${route}`);

    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      // Wait for React to render and framer-motion animations to settle
      await new Promise(r => setTimeout(r, 2000));

      const html = await page.content();

      // Write to dist
      const outputDir = route === '/' ? distDir : resolve(distDir, route.slice(1));
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }
      writeFileSync(resolve(outputDir, 'index.html'), html, 'utf-8');
      console.log(`  Done`);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('\nPre-rendering complete!');
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err.message);
  console.log('Skipping pre-rendering (Chrome not available in this environment).');
  console.log('The site will still work as a client-rendered SPA.');
  // Exit 0 so the build continues
  process.exit(0);
});
