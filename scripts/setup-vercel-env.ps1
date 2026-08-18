# setup-vercel-env.ps1
# Syncs .env.local to Vercel using the REST API.
# Always deletes and recreates vars to ensure values are set correctly.
#
# Usage: .\scripts\setup-vercel-env.ps1
# Requires: VERCEL_API_TOKEN in .env.deploy

$ErrorActionPreference = "Stop"

# --- Configuration ---
# Sensitive vars: hidden in Vercel UI, production+preview ONLY (no development)
$SensitiveVars = @("GEMINI_API_KEY")

# Encrypted vars: values hidden in API responses, all targets
$EncryptedVars = @("NTFY_TOPIC")

# Everything else: plain type, all targets

# --- Helper Functions ---
function Write-Error-And-Exit {
    param([string]$Message, [string]$Details = "")
    Write-Host ""
    Write-Host "ERROR: $Message" -ForegroundColor Red
    if ($Details) { Write-Host $Details -ForegroundColor Yellow }
    Write-Host ""
    exit 1
}

function Get-EnvFileValue {
    param([string]$File, [string]$Key)
    if (-not (Test-Path $File)) { return $null }
    foreach ($line in (Get-Content $File -Encoding UTF8)) {
        $trimmed = $line.Trim()
        if ($trimmed -and -not $trimmed.StartsWith('#') -and $trimmed.StartsWith("$Key=")) {
            $value = $trimmed.Substring($Key.Length + 1).Trim()
            # Strip surrounding quotes
            if (($value.StartsWith('"') -and $value.EndsWith('"')) -or
                ($value.StartsWith("'") -and $value.EndsWith("'"))) {
                $value = $value.Substring(1, $value.Length - 2)
            }
            return $value
        }
    }
    return $null
}

function Invoke-VercelApi {
    param(
        [string]$Uri,
        [string]$Method = "Get",
        [hashtable]$Body = $null
    )
    
    $params = @{
        Uri = $Uri
        Headers = $script:Headers
        Method = $Method
    }
    
    if ($Body) {
        $json = $Body | ConvertTo-Json -Compress -Depth 10
        $params.Body = [System.Text.Encoding]::UTF8.GetBytes($json)
        $params.ContentType = "application/json; charset=utf-8"
    }
    
    try {
        $response = Invoke-RestMethod @params
        return @{ Success = $true; Data = $response; Error = $null }
    } catch {
        $statusCode = $null
        $errorMessage = $_.Exception.Message
        $errorBody = $null
        
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
        }
        if ($_.ErrorDetails.Message) {
            $errorBody = $_.ErrorDetails.Message
            try {
                $parsed = $errorBody | ConvertFrom-Json
                if ($parsed.error.message) {
                    $errorMessage = $parsed.error.message
                }
            } catch {}
        }
        
        return @{
            Success = $false
            Data = $null
            Error = @{
                StatusCode = $statusCode
                Message = $errorMessage
                Body = $errorBody
            }
        }
    }
}

# --- Main Script ---
$envFile = Join-Path $PSScriptRoot "..\.env.local"
$projectFile = Join-Path $PSScriptRoot "..\.vercel\repo.json"
$deployFile = Join-Path $PSScriptRoot "..\.env.deploy"

# Validate files exist
if (-not (Test-Path $envFile)) {
    Write-Error-And-Exit ".env.local not found"
}
if (-not (Test-Path $projectFile)) {
    Write-Error-And-Exit ".vercel/repo.json not found" "Run 'npx vercel link' first"
}

# Load project config
$repoConfig = Get-Content $projectFile -Encoding UTF8 | ConvertFrom-Json
$projectId = $repoConfig.projects[0].id
$orgId = $repoConfig.projects[0].orgId
$projectName = $repoConfig.projects[0].name

# Get token
$token = Get-EnvFileValue -File $deployFile -Key "VERCEL_API_TOKEN"
if (-not $token) { $token = $env:VERCEL_TOKEN }

if (-not $token) {
    Write-Error-And-Exit "VERCEL_API_TOKEN not found" @"
To fix:
  1. Go to https://vercel.com/account/tokens
  2. Create a new token with 'Full Account' scope
  3. Add to .env.deploy: VERCEL_API_TOKEN=your-token-here
"@
}

if ($token.StartsWith("eyJ")) {
    Write-Error-And-Exit "Token is a JWT/OIDC token" @"
OIDC tokens only work inside Vercel CI/CD.
For local scripts, create a Bearer API token at:
  https://vercel.com/account/tokens
"@
}

# Set up API headers
$script:Headers = @{ Authorization = "Bearer $token" }
$baseUrl = "https://api.vercel.com/v9/projects/$projectId/env"
$teamParam = "teamId=$orgId"

# Parse .env.local
$vars = @{}
foreach ($line in (Get-Content $envFile -Encoding UTF8)) {
    $trimmed = $line.Trim()
    if ($trimmed -and -not $trimmed.StartsWith('#')) {
        $idx = $trimmed.IndexOf('=')
        if ($idx -gt 0) {
            $k = $trimmed.Substring(0, $idx).Trim()
            $v = $trimmed.Substring($idx + 1).Trim()
            # Strip quotes
            if (($v.StartsWith('"') -and $v.EndsWith('"')) -or
                ($v.StartsWith("'") -and $v.EndsWith("'"))) {
                $v = $v.Substring(1, $v.Length - 2)
            }
            if ($k -and $v) { $vars[$k] = $v }
        }
    }
}

if ($vars.Count -eq 0) {
    Write-Host "No variables found in .env.local" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Syncing $($vars.Count) vars to Vercel ($projectName)" -ForegroundColor Cyan
Write-Host "=" * 50

# Get existing vars
$result = Invoke-VercelApi -Uri "$baseUrl`?$teamParam" -Method Get
if (-not $result.Success) {
    if ($result.Error.StatusCode -eq 401 -or $result.Error.StatusCode -eq 403) {
        Write-Error-And-Exit "Authorization failed (HTTP $($result.Error.StatusCode))" @"
Your token may be expired, revoked, or have insufficient permissions.
Create a new token at: https://vercel.com/account/tokens
"@
    }
    Write-Error-And-Exit "Failed to fetch existing vars" $result.Error.Message
}

$existing = @{}
foreach ($e in $result.Data.envs) {
    $existing[$e.key] = $e.id
}

# Process each var
$created = 0
$updated = 0
$errors = @()

foreach ($key in $vars.Keys) {
    $value = $vars[$key]
    $isSensitive = $SensitiveVars -contains $key
    $isEncrypted = $EncryptedVars -contains $key
    
    # Delete existing var(s) with this key first
    if ($existing.ContainsKey($key)) {
        Write-Host "  Updating: $key " -NoNewline
        # There might be multiple (sensitive creates 2 entries)
        $toDelete = $result.Data.envs | Where-Object { $_.key -eq $key }
        foreach ($env in $toDelete) {
            $deleteResult = Invoke-VercelApi -Uri "$baseUrl/$($env.id)`?$teamParam" -Method Delete
            if (-not $deleteResult.Success) {
                Write-Host "[FAILED TO DELETE]" -ForegroundColor Red
                $errors += "Failed to delete $key`: $($deleteResult.Error.Message)"
                continue
            }
        }
    } else {
        Write-Host "  Creating: $key " -NoNewline
    }
    
    if ($isSensitive) {
        # Sensitive vars: production+preview ONLY, no development
        $body = @{
            key = $key
            value = $value
            target = @("production", "preview")
            type = "sensitive"
        }
        $createResult = Invoke-VercelApi -Uri "$baseUrl`?$teamParam" -Method Post -Body $body
        
        if ($createResult.Success) {
            Write-Host "[OK] (sensitive, prod+preview only)" -ForegroundColor Green
            if ($existing.ContainsKey($key)) { $updated++ } else { $created++ }
        } else {
            Write-Host "[FAILED]" -ForegroundColor Red
            Write-Host "    Error: $($createResult.Error.Message)" -ForegroundColor Yellow
            $errors += "Failed to create $key`: $($createResult.Error.Message)"
        }
    } else {
        # Non-sensitive: single entry for all targets
        $varType = if ($isEncrypted) { "encrypted" } else { "plain" }
        $body = @{
            key = $key
            value = $value
            target = @("production", "preview", "development")
            type = $varType
        }
        
        $createResult = Invoke-VercelApi -Uri "$baseUrl`?$teamParam" -Method Post -Body $body
        
        if ($createResult.Success) {
            $typeLabel = "($varType)"
            Write-Host "[OK] $typeLabel" -ForegroundColor Green
            if ($existing.ContainsKey($key)) { $updated++ } else { $created++ }
        } else {
            Write-Host "[FAILED]" -ForegroundColor Red
            Write-Host "    Error: $($createResult.Error.Message)" -ForegroundColor Yellow
            $errors += "Failed to create $key`: $($createResult.Error.Message)"
        }
    }
}

# Summary
Write-Host ""
Write-Host "=" * 50
if ($errors.Count -eq 0) {
    Write-Host "SUCCESS: Created $created, Updated $updated" -ForegroundColor Green
    Write-Host "Changes are live immediately." -ForegroundColor DarkGray
} else {
    Write-Host "COMPLETED WITH ERRORS" -ForegroundColor Yellow
    Write-Host "  Created: $created, Updated: $updated, Failed: $($errors.Count)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Errors:" -ForegroundColor Red
    foreach ($err in $errors) {
        Write-Host "  - $err" -ForegroundColor Red
    }
    exit 1
}
