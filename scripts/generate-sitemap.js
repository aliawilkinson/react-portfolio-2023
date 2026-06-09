import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://aliawilkinson.com';

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

/**
 * Generates a sitemap XML string from a list of routes and a base URL.
 * @param {object} options
 * @param {string} options.baseUrl - The base domain URL (e.g., https://aliawilkinson.com)
 * @param {string[]} options.routes - Array of route paths (e.g., ['/', '/about'])
 * @returns {string} Valid sitemap XML string
 */
export function generateSitemapXml({ baseUrl, routes }) {
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? baseUrl + '/' : baseUrl + route;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// Run as script when executed directly
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__filename);

if (isMain) {
  const outputDir = resolve(__dirname, '..', 'dist');
  const outputPath = resolve(outputDir, 'sitemap.xml');

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const xml = generateSitemapXml({ baseUrl: BASE_URL, routes });
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Sitemap generated at ${outputPath}`);
}
