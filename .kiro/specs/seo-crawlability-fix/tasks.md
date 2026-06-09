# Implementation Plan: SEO & Crawlability Fix

## Overview

Implement pre-rendering, per-page SEO metadata, sitemap generation, robots.txt, semantic HTML fixes, and a post-build validation script for aliawilkinson.com. The approach uses vite-plugin-prerender for static HTML generation at build time, react-helmet-async for metadata injection, and a custom Node.js script for sitemap generation and validation.

## Tasks

- [x] 1. Install dependencies and set up testing infrastructure
  - [x] 1.1 Install production dependencies: `react-helmet-async`, `vite-plugin-prerender`
    - Add to package.json and install
    - _Requirements: 1.1, 3.1_
  - [x] 1.2 Install dev dependencies: `vitest`, `fast-check`, `jsdom`
    - Configure vitest in vite.config.js or vitest.config.js
    - _Requirements: 8.1_
  - [x] 1.3 Create test directory structure (`tests/unit/`, `tests/property/`)
    - _Requirements: 8.1_

- [x] 2. Implement SEO metadata component and data
  - [x] 2.1 Create `src/utils/seoData.js` with metadata for each route
    - Define title, description, and image for homepage, about page, and all 7 case studies
    - Include site-wide defaults for fallback
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  - [x] 2.2 Create `src/components/SEO/SEO.jsx` component using react-helmet-async
    - Accept title, description, url, image props
    - Render title tag, meta description, OG tags (og:title, og:description, og:url, og:image), and canonical link
    - Fall back to defaults from seoData.js when props are missing
    - _Requirements: 3.1, 3.2, 3.3, 7.3, 3.5_
  - [x] 2.3 Wrap the app with `HelmetProvider` in `src/main.jsx`
    - _Requirements: 3.4_
  - [x] 2.4 Add SEO component to `InfoPost.jsx` for case study pages
    - Look up metadata from seoData.js based on the post prop
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 2.5 Add SEO component to the Home page component
    - Use homepage-specific metadata
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [ ]*2.6 Write property test for SEO metadata completeness
    - **Property 3: SEO metadata completeness**
    - Generate random valid SEO data objects, render SEO component, verify all required tags present in output
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 7.3**

- [x] 3. Implement sitemap generator
  - [x] 3.1 Create `scripts/generate-sitemap.js`
    - Accept routes array and base URL
    - Output valid sitemap.xml with urlset and url/loc elements
    - Use absolute URLs with https://aliawilkinson.com domain
    - Write output to dist/sitemap.xml
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  - [ ]*3.2 Write property test for sitemap correctness
    - **Property 4: Sitemap correctness**
    - Generate random route lists, run generator function, validate XML contains all routes as absolute URLs
    - **Validates: Requirements 4.2, 4.3, 4.5**
  - [ ]*3.3 Write unit tests for sitemap edge cases
    - Test empty route list, routes with special characters, single route
    - _Requirements: 4.2, 4.5_

- [x] 4. Add robots.txt and static SEO files
  - [x] 4.1 Create `public/robots.txt`
    - Allow all crawlers on all paths
    - Reference sitemap at https://aliawilkinson.com/sitemap.xml
    - _Requirements: 7.1, 7.2, 7.4_

- [x] 5. Checkpoint - Verify metadata and sitemap infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Fix internal linking and semantic HTML
  - [x] 6.1 Verify and fix CaseStudies component linking
    - Ensure Link components render with proper href attributes (they currently use react-router Link which renders as `<a>`)
    - Remove `target="_blank"` from case study links so crawlers follow them normally
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 6.2 Audit and fix heading hierarchy in InfoPost component
    - Ensure each case study page has exactly one h1 (the title)
    - Verify case study content uses h2/h3 in proper order (content comes from posts.js HTML strings)
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 6.3 Audit and fix heading hierarchy on the homepage
    - Ensure homepage has exactly one h1
    - Check that section headings use h2, not h1
    - _Requirements: 6.1, 6.2_
  - [ ]*6.4 Write property test for heading hierarchy validation
    - **Property 7: Heading hierarchy**
    - Generate random heading sequences, validate the hierarchy checker correctly identifies valid/invalid orderings
    - **Validates: Requirements 6.2**

- [x] 7. Configure pre-rendering in Vite
  - [x] 7.1 Add vite-plugin-prerender to `vite.config.js`
    - Configure all routes: /, /about, and all 7 case study paths
    - Set renderAfterTime to allow framer-motion animations to complete
    - _Requirements: 1.1, 1.3_
  - [x] 7.2 Update `package.json` build script to include post-build sitemap generation
    - Chain sitemap generation after vite build: `"build": "vite build && node scripts/generate-sitemap.js"`
    - _Requirements: 4.1, 4.4_
  - [x] 7.3 Update vercel.json rewrites to serve pre-rendered files correctly
    - Ensure pre-rendered HTML files take priority over SPA fallback
    - _Requirements: 2.2_

- [x] 8. Implement post-build validation script
  - [x] 8.1 Create `scripts/validate-seo.js`
    - Read each pre-rendered HTML file from dist/
    - Check for text content beyond empty div#root
    - Check for title tag and meta description in head
    - Check for heading elements
    - Validate sitemap.xml exists and contains expected URLs
    - Report failures with specific route and check type
    - Exit non-zero on any failure
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [ ]*8.2 Write property test for validation script detection
    - **Property 8: Validation script correctness**
    - Generate random HTML strings with/without content, headings, metadata; verify the validator correctly detects presence/absence
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**
  - [x] 8.3 Add validate script to package.json
    - Add `"validate": "node scripts/validate-seo.js"` script
    - Optionally chain after build: `"build": "vite build && node scripts/generate-sitemap.js && node scripts/validate-seo.js"`
    - _Requirements: 8.1_

- [x] 9. Final checkpoint - Build and validate
  - Run full build, verify pre-rendered HTML files exist for all routes
  - Run validation script and confirm all checks pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- The project uses JavaScript (not TypeScript) — all new files should be .js/.jsx
- react-helmet-async is needed instead of react-helmet because it supports SSR/pre-rendering contexts
- The pre-rendering step requires a headless browser (Puppeteer) which vite-plugin-prerender handles internally
- Property tests use fast-check and run minimum 100 iterations each
- The validation script doubles as both CI check and manual verification tool
