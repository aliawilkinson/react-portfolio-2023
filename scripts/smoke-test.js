#!/usr/bin/env node
/**
 * Post-deploy smoke tests
 * Verifies the live site is working after deployment.
 * 
 * Usage: node scripts/smoke-test.js [base-url]
 * Default: https://aliawilkinson.com
 */

const BASE_URL = process.argv[2] || 'https://aliawilkinson.com';

const routes = [
  { path: '/', name: 'Homepage' },
  { path: '/tarot', name: 'Tarot' },
  { path: '/case-studies/agentic-workflow', name: 'Case Study' },
  { path: '/resume', name: 'Resume' },
  { path: '/api/gemini', name: 'Gemini API', isApi: true },
];

async function checkRoute(route) {
  const url = `${BASE_URL}${route.path}`;
  const start = Date.now();
  
  try {
    // API endpoints get a POST with minimal body to check they respond
    const options = route.isApi 
      ? { 
          method: 'POST',
          headers: { 
            'User-Agent': 'SmokeTest/1.0',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: 'health check', cards: [] })
        }
      : { headers: { 'User-Agent': 'SmokeTest/1.0' } };
    
    const response = await fetch(url, options);
    const elapsed = Date.now() - start;
    
    // API endpoint: 400 is okay (means it's responding, just rejecting bad input)
    // 500+ is bad, 401/403 means auth issues
    if (route.isApi) {
      if (response.status >= 500) {
        return { route, success: false, error: `HTTP ${response.status}`, elapsed };
      }
      // Any response under 500 means the serverless function is working
      return { route, success: true, elapsed, note: `HTTP ${response.status}` };
    }
    
    if (!response.ok) {
      return { 
        route, 
        success: false, 
        error: `HTTP ${response.status}`,
        elapsed 
      };
    }
    
    const html = await response.text();
    
    // Check for React app root - confirms the app shell loaded
    if (!html.includes('id="root"')) {
      return { 
        route, 
        success: false, 
        error: 'React app root not found',
        elapsed 
      };
    }
    
    // Check for obvious errors in the HTML
    if (html.includes('500 Internal Server Error') || html.includes('Application error')) {
      return { 
        route, 
        success: false, 
        error: 'Server error detected in response',
        elapsed 
      };
    }
    
    return { route, success: true, elapsed };
    
  } catch (err) {
    return { 
      route, 
      success: false, 
      error: err.message,
      elapsed: Date.now() - start 
    };
  }
}

async function runSmokeTests() {
  console.log(`\n🔥 Smoke testing: ${BASE_URL}\n`);
  console.log('─'.repeat(50));
  
  const results = await Promise.all(routes.map(checkRoute));
  
  let passed = 0;
  let failed = 0;
  
  for (const result of results) {
    const status = result.success ? '✓' : '✗';
    const color = result.success ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    const time = `${result.elapsed}ms`;
    
    console.log(`${color}${status}${reset} ${result.route.name.padEnd(20)} ${time.padStart(6)}`);
    
    if (!result.success) {
      console.log(`  └─ ${result.error}`);
      failed++;
    } else {
      passed++;
    }
  }
  
  console.log('─'.repeat(50));
  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

runSmokeTests();
