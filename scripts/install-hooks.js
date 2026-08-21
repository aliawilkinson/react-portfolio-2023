#!/usr/bin/env node
/**
 * Install git hooks from .githooks/ to .git/hooks/
 * Run with: npm run test:install-hooks
 */

import { copyFileSync, chmodSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

const hooks = ['pre-push']

const gitHooksDir = join(rootDir, '.git', 'hooks')

// Ensure .git/hooks exists
if (!existsSync(gitHooksDir)) {
  mkdirSync(gitHooksDir, { recursive: true })
}

for (const hook of hooks) {
  const src = join(rootDir, '.githooks', hook)
  const dest = join(gitHooksDir, hook)

  if (!existsSync(src)) {
    console.log(`⚠️  Source hook not found: .githooks/${hook}`)
    continue
  }

  try {
    copyFileSync(src, dest)
    // Set executable permission (chmod +x) - works on Unix, no-op on Windows
    try {
      chmodSync(dest, 0o755)
    } catch {
      // Windows doesn't need chmod
    }
    console.log(`✅ Installed ${hook} hook`)
  } catch (err) {
    console.error(`❌ Failed to install ${hook}: ${err.message}`)
    process.exit(1)
  }
}

console.log('\nGit hooks installed. Fast tests will run before each push.')
