$json = Get-Content 'D:\Projects\sieutrinho\body_anchors_parsed.json' -Encoding UTF8 | ConvertFrom-Json
$stations = $json | Select-Object -ExpandProperty station | Sort-Object -Unique
Write-Host 'Stations found:'
$stations | ForEach-Object { Write-Host ('  ' + $_) }
Write-Host ''
Write-Host 'Item count per station:'
$stations | ForEach-Object {
    $s = $_
    $items = $json | Where-Object { $_.station -eq $s }
    $nums = ($items | Select-Object -ExpandProperty num) -join ','
    Write-Host ("  $s  count:" + $items.Count + "  nums: $nums")
}
