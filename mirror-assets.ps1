$ErrorActionPreference = 'Stop'
$base = 'https://h5.metaapp.cn/online/h5/BUsvkkbBiAq2pF2Ttx4j/1.0.2/6/'
$root = $PSScriptRoot
$sources = @(
  'assets/game-BDvRcsxG.js',
  'assets/main-BsKo9vWW.js',
  'assets/game-DhG0Y0Ys.css',
  'assets/main-B4FeNT19.css'
)
$paths = [System.Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
foreach ($source in $sources) {
  $content = [System.IO.File]::ReadAllText((Join-Path $root $source))
  foreach ($match in [regex]::Matches($content, 'assets/[A-Za-z0-9_./-]+\.(?:webp|png|jpe?g|svg|mp3|ogg|wav|mp4|woff2?)')) {
    [void]$paths.Add($match.Value)
  }
}
foreach ($path in ($paths | Sort-Object)) {
  $target = Join-Path $root $path
  if (Test-Path $target) { continue }
  New-Item -ItemType Directory -Path (Split-Path $target) -Force | Out-Null
  Invoke-WebRequest -Uri ($base + $path) -OutFile $target -UseBasicParsing
  Write-Host $path
}
Write-Host "Downloaded $($paths.Count) referenced assets."
