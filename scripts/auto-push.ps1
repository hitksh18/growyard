# Growyard Auto Push - every 5 mins
$ErrorActionPreference = "SilentlyContinue"
Set-Location -LiteralPath "D:\growyard"

$logFile = "D:\growyard\auto-push.log"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check for changes (ignore untracked favicon.png.png duplicate)
$status = git status --porcelain 2>&1 | Where-Object { $_ -notmatch "favicon\.png\.png" }
if (-not $status -or $status.Count -eq 0) {
  Add-Content -LiteralPath $logFile -Value "[$timestamp] No changes - skip"
  exit 0
}

# Stage all except duplicate
git add -A 2>&1 | Out-Null
git reset -- favicon.png.png 2>&1 | Out-Null
git reset -- auto-push.log 2>&1 | Out-Null

$staged = git diff --cached --name-only 2>&1
if (-not $staged) {
  Add-Content -LiteralPath $logFile -Value "[$timestamp] Nothing staged after filter - skip"
  exit 0
}

$msg = "auto: sync $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $msg 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
  Add-Content -LiteralPath $logFile -Value "[$timestamp] Commit failed"
  exit 0
}

$pushOut = git push origin main 2>&1
if ($LASTEXITCODE -eq 0) {
  $stagedFlat = ($staged -join ", ")
  Add-Content -LiteralPath $logFile -Value "[$timestamp] Pushed: $msg - $stagedFlat"
} else {
  $outFlat = ($pushOut -join " | ")
  Add-Content -LiteralPath $logFile -Value "[$timestamp] Push failed: $outFlat"
}
