import { readFileSync, existsSync } from 'fs';
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
 * Checks if the HTML contains meaningful text content beyond an empty div#root.
 * @param {string} html - The HTML string to check
 * @returns {boolean}
 */
export function hasContent(html) {
  // Remove the empty div#root pattern and check if there's text content in the body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) return false;

  const bodyContent = bodyMatch[1];
  // Strip all HTML tags and check for remaining non-whitespace text
  const textOnly = bodyContent.replace(/<[^>]+>/g, '').trim();
  // Must have more than trivial content
  return textOnly.length > 10;
}

/**
 * Checks if the HTML contains a <title> tag with content.
 * @param {string} html - The HTML string to check
 * @returns {boolean}
 */
export function hasTitle(html) {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match !== null && match[1].trim().length > 0;
}

/**
 * Checks if the HTML contains a meta description tag with content.
 * @param {string} html - The HTML string to check
 * @returns {boolean}
 */
export function hasMetaDescription(html) {
  const match = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (match) return true;
  // Also check the reverse attribute order
  const reverseMatch = html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  return reverseMatch !== null;
}

/**
 * Checks if the HTML contains heading elements (h1, h2, or h3).
 * @param {string} html - The HTML string to check
 * @returns {boolean}
 */
export function hasHeadings(html) {
  return /<h[1-3][\s>]/i.test(html);
}

/**
 * Validates a single pre-rendered HTML file.
 * @param {string} route - The route path
 * @param {string} distDir - Path to the dist directory
 * @returns {{ route: string, errors: string[] }}
 */
function validateRoute(route, distDir) {
  const errors = [];
  const filePath = route === '/'
    ? resolve(distDir, 'index.html')
    : resolve(distDir, route.slice(1), 'index.html');

  if (!existsSync(filePath)) {
    errors.push(`File not found: ${filePath}`);
    return { route, errors };
  }

  const html = readFileSync(filePath, 'utf-8');

  if (!hasContent(html)) {
    errors.push(`[${route}] FAIL: Has content - page contains no meaningful text beyond empty div#root`);
  }

  if (!hasTitle(html)) {
    errors.push(`[${route}] FAIL: Has title - missing <title> tag or title is empty`);
  }

  if (!hasMetaDescription(html)) {
    errors.push(`[${route}] FAIL: Has meta description - missing <meta name="description"> tag`);
  }

  if (!hasHeadings(html)) {
    errors.push(`[${route}] FAIL: Has headings - no h1, h2, or h3 elements found`);
  }

  return { route, errors };
}

/**
 * Validates that sitemap.xml exists and contains all expected URLs.
 * @param {string} distDir - Path to the dist directory
 * @param {string[]} expectedRoutes - List of route paths to check
 * @param {string} baseUrl - The base URL for the site
 * @returns {string[]} Array of error messages
 */
function validateSitemap(distDir, expectedRoutes, baseUrl) {
  const errors = [];
  const sitemapPath = resolve(distDir, 'sitemap.xml');

  if (!existsSync(sitemapPath)) {
    errors.push('[sitemap.xml] FAIL: Sitemap valid - sitemap.xml not found in dist/');
    return errors;
  }

  const sitemapContent = readFileSync(sitemapPath, 'utf-8');

  for (const route of expectedRoutes) {
    const expectedUrl = route === '/' ? `${baseUrl}/` : `${baseUrl}${route}`;
    if (!sitemapContent.includes(expectedUrl)) {
      errors.push(`[sitemap.xml] FAIL: Sitemap valid - missing URL: ${expectedUrl}`);
    }
  }

  return errors;
}

// Run as script when executed directly
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__filename);

if (isMain) {
  const distDir = resolve(__dirname, '..', 'dist');
  let allErrors = [];

  console.log('SEO Validation Report');
  console.log('=====================\n');

  // Validate each route
  for (const route of routes) {
    const result = validateRoute(route, distDir);
    if (result.errors.length === 0) {
      console.log(`✓ ${route} - all checks passed`);
    } else {
      allErrors = allErrors.concat(result.errors);
      for (const error of result.errors) {
        console.log(`✗ ${error}`);
      }
    }
  }

  // Validate sitemap
  console.log('');
  const sitemapErrors = validateSitemap(distDir, routes, BASE_URL);
  if (sitemapErrors.length === 0) {
    console.log('✓ sitemap.xml - all checks passed');
  } else {
    allErrors = allErrors.concat(sitemapErrors);
    for (const error of sitemapErrors) {
      console.log(`✗ ${error}`);
    }
  }

  // Summary
  console.log(`\n=====================`);
  if (allErrors.length > 0) {
    console.log(`\n❌ Validation FAILED: ${allErrors.length} error(s) found\n`);
    process.exit(1);
  } else {
    console.log(`\n✅ Validation PASSED: All checks passed for ${routes.length} routes\n`);
    process.exit(0);
  }
}
