# dev.ps1 - start the portfolio dev server
# Usage: .\dev.ps1

$devUrl = 'http://localhost:5173'
$nvmrcVersion = (Get-Content "$PSScriptRoot\.nvmrc").Trim()

Write-Host ''
Write-Host 'Checking Node version...' -ForegroundColor Cyan

$currentNode = node --version 2>$null
if ($currentNode -like "v$nvmrcVersion*") {
    Write-Host "Node $currentNode already active." -ForegroundColor Green
} else {
    Write-Host "Current Node: $currentNode - project wants v$nvmrcVersion" -ForegroundColor Yellow
    Write-Host "To switch: open a new terminal and run 'nvm use $nvmrcVersion'" -ForegroundColor Yellow
    Write-Host 'Continuing with current version...' -ForegroundColor Yellow
}

Write-Host ''
Write-Host 'Installing dependencies...' -ForegroundColor Cyan
npm install

Write-Host ''
Write-Host "Starting dev server at $devUrl" -ForegroundColor Green
Write-Host 'Press Ctrl+C to stop.' -ForegroundColor DarkGray
Write-Host ''

Start-Process $devUrl
npm run dev
