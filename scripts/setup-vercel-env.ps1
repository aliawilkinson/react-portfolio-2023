# setup-vercel-env.ps1
# Sets all required environment variables on your Vercel project.
# Run once after `vercel link`, or when spinning up a new project.
#
# Usage: .\scripts\setup-vercel-env.ps1
# Prereqs: npm i -g vercel && vercel login && vercel link

Write-Host "Setting up Vercel environment variables..." -ForegroundColor Cyan
Write-Host ""

# Secrets (prompted)
$geminiKey = Read-Host "GEMINI_API_KEY"

# Defaults (edit these if you change services)
$vars = @{
    "GEMINI_API_KEY"           = $geminiKey
    "GEMINI_MODEL"             = "gemini-flash-latest"
    "NTFY_TOPIC"               = "aliawilkinson-tarot"
    "VITE_CLARITY_PROJECT_ID"  = "xzenxh0biq"
}

foreach ($key in $vars.Keys) {
    $value = $vars[$key]
    if ([string]::IsNullOrEmpty($value)) {
        Write-Host "Skipping $key (empty)" -ForegroundColor Yellow
        continue
    }
    Write-Host "Setting $key..." -ForegroundColor Cyan
    echo $value | vercel env add $key production --force
}

Write-Host ""
Write-Host "All env vars set. Deploy with: vercel --prod" -ForegroundColor Green
