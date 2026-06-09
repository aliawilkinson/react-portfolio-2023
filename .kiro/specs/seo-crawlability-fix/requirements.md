# Requirements Document

## Introduction

This document defines the technical SEO and crawlability requirements for aliawilkinson.com, a React + Vite portfolio site deployed on Vercel. The site currently renders entirely client-side, meaning search engines and AI tools see only an empty `<div id="root">` when fetching pages. The goal is to make all pages — especially case study pages — fully readable, crawlable, and indexable without changing the existing content or requiring a framework migration.

## Glossary

- **Pre_Renderer**: A build-time tool that crawls the SPA and generates static HTML snapshots for each route
- **SEO_Metadata_Manager**: A component responsible for injecting per-page title, meta description, and Open Graph tags into the document head
- **Sitemap_Generator**: A build-time script that produces a sitemap.xml listing all indexable URLs
- **Case_Study_Page**: An individual route corresponding to a portfolio case study (e.g., /releaseofreleases, /agenticWorkflowApp)
- **Crawler**: A search engine bot or AI tool that fetches and parses web pages for indexing
- **Semantic_HTML**: HTML markup that uses appropriate heading hierarchy and structural elements to convey meaning

## Requirements

### Requirement 1: Pre-render Pages at Build Time

**User Story:** As a site owner, I want all pages to be pre-rendered to static HTML at build time, so that crawlers can read the full content without executing JavaScript.

#### Acceptance Criteria

1. WHEN the build process completes, THE Pre_Renderer SHALL generate a static HTML file for each defined route containing the fully rendered page content
2. WHEN a crawler requests any page, THE server SHALL return HTML containing the actual text content of that page rather than only a div#root element
3. WHEN a Case_Study_Page is pre-rendered, THE Pre_Renderer SHALL include the full case study text, headings, and structure in the static HTML output
4. IF the Pre_Renderer encounters a route that fails to render, THEN THE Pre_Renderer SHALL log the error and continue processing remaining routes

### Requirement 2: Ensure Indexable Route Structure

**User Story:** As a site owner, I want every case study to exist as a real, independently accessible route, so that search engines treat each one as a separate page.

#### Acceptance Criteria

1. THE site SHALL serve each Case_Study_Page at a unique, stable URL path
2. WHEN a crawler directly requests a Case_Study_Page URL, THE server SHALL return a complete HTML response for that specific page
3. THE site SHALL NOT require JavaScript execution, modal interaction, or tab switching to access any Case_Study_Page content

### Requirement 3: Inject Per-Page SEO Metadata

**User Story:** As a site owner, I want each page to have unique title, meta description, and Open Graph tags, so that search results and social shares display accurate information for each page.

#### Acceptance Criteria

1. THE SEO_Metadata_Manager SHALL inject a unique title tag for each page into the document head
2. THE SEO_Metadata_Manager SHALL inject a unique meta description tag for each page into the document head
3. THE SEO_Metadata_Manager SHALL inject Open Graph tags (og:title, og:description, og:url, og:image) for each page
4. WHEN a page is pre-rendered, THE static HTML output SHALL contain the page-specific metadata in the head element
5. IF a page has no custom metadata defined, THEN THE SEO_Metadata_Manager SHALL fall back to site-wide default metadata

### Requirement 4: Generate a Sitemap

**User Story:** As a site owner, I want a sitemap.xml generated at build time, so that search engines can discover all pages on the site.

#### Acceptance Criteria

1. WHEN the build process completes, THE Sitemap_Generator SHALL produce a sitemap.xml file in the build output directory
2. THE Sitemap_Generator SHALL include the homepage URL and all Case_Study_Page URLs in the sitemap
3. THE Sitemap_Generator SHALL use absolute URLs with the correct domain (https://aliawilkinson.com)
4. THE sitemap.xml SHALL be accessible at the /sitemap.xml path on the deployed site
5. THE Sitemap_Generator SHALL format the sitemap according to the sitemap protocol specification (XML with urlset and url elements)

### Requirement 5: Fix Internal Linking Structure

**User Story:** As a site owner, I want the homepage to link directly to each case study using standard anchor tags, so that crawlers can discover all pages through link traversal.

#### Acceptance Criteria

1. THE homepage SHALL contain an anchor element with an href attribute pointing to each Case_Study_Page
2. THE site SHALL NOT rely solely on JavaScript-based navigation (onClick handlers without href) to link to Case_Study_Pages
3. WHEN a crawler parses the homepage HTML, THE crawler SHALL be able to discover all Case_Study_Page URLs through standard link extraction

### Requirement 6: Improve Semantic HTML Structure

**User Story:** As a site owner, I want each page to use proper heading hierarchy and semantic elements, so that crawlers can understand the content structure.

#### Acceptance Criteria

1. THE site SHALL render exactly one h1 element per page
2. THE site SHALL use h2 and h3 elements in proper hierarchical order within each page (no skipping heading levels)
3. THE Case_Study_Page content SHALL be rendered as real text in semantic HTML elements rather than as images or canvas elements

### Requirement 7: Add Robots and Indexing Controls

**User Story:** As a site owner, I want proper robots.txt, canonical tags, and indexing directives, so that search engines know which pages to crawl and index.

#### Acceptance Criteria

1. THE site SHALL serve a robots.txt file at the /robots.txt path that allows crawling of all important pages
2. THE robots.txt SHALL reference the sitemap.xml location
3. THE SEO_Metadata_Manager SHALL inject a canonical link tag on each page pointing to its own absolute URL
4. THE robots.txt SHALL NOT block crawling of any Case_Study_Page or the homepage

### Requirement 8: Validate Crawlability

**User Story:** As a site owner, I want automated validation that confirms pre-rendered pages contain real content, so that I can verify the SEO fixes are working correctly.

#### Acceptance Criteria

1. WHEN the build completes, THE validation script SHALL check that each pre-rendered HTML file contains text content beyond the div#root element
2. WHEN the validation script checks a Case_Study_Page, THE script SHALL verify that the HTML contains heading elements and paragraph text from the case study
3. THE validation script SHALL verify that sitemap.xml exists and contains valid URLs
4. THE validation script SHALL verify that each page's HTML head contains a title tag and meta description
5. IF any validation check fails, THEN THE validation script SHALL report the specific failure with the affected page path
