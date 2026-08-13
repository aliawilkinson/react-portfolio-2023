# setup-vercel-env.ps1
# Sets all required environment variables on your Vercel project.
# Run once after `vercel link`, or when spinning up a new project.
#
# Usage: .\scripts\setup-vercel-env.ps1
# Prereqs: npm i -g vercel && vercel login && vercel link

$vars = @{
    "GEMINI_API_KEY" = Read-Host "GEMINI_API_KEY"
    "GEMINI_MODEL"   = "gemini-3.5-flash"
    "NTFY_TOPIC"     = "aliawilkinson-tarot"
}

foreach ($key in $vars.Keys) {
    $value = $vars[$key]
    Write-Host "Setting $key..." -ForegroundColor Cyan
    echo $value | vercel env add $key production
}

Write-Host ""
Write-Host "Done. Deploy with: vercel --prod" -ForegroundColor Green
