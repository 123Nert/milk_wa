$port = 4173
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  Write-Host "Port $port is already in use. Open http://127.0.0.1:$port/ if this game's server is running."
  exit
}
Set-Location $PSScriptRoot
Write-Host "Open http://127.0.0.1:$port/"
python -m http.server $port --bind 127.0.0.1
