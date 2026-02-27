$content = [System.IO.File]::ReadAllText('D:\Projects\sieutrinho\100_Diem_Neo_Co_The.doc', [System.Text.Encoding]::UTF8)
$rowMatches = [regex]::Matches($content, '(?si)<tr[^>]*>(.*?)</tr>')
$result = New-Object System.Collections.ArrayList
$tram = 'Tram 1'
foreach ($rowMatch in $rowMatches) {
    $row = $rowMatch.Groups[1].Value
    $colMatches = [regex]::Matches($row, '(?si)<td[^>]*>(.*?)</td>')
    $cols = @()
    foreach ($cm in $colMatches) {
        $val = ([regex]::Replace($cm.Groups[1].Value, '<[^>]+>', '')).Trim()
        $val = $val -replace '&nbsp;', ' '
        $val = $val.Trim()
        $cols += $val
    }
    if ($cols.Count -ge 2) {
        if ($cols[0] -match 'Tr.*m') {
            $tram = $cols[0].Trim() + ': ' + $cols[1].Trim()
        }
        elseif ($cols[0].Trim() -match '^\d+$') {
            $stt = [int]($cols[0].Trim())
            if ($stt -ge 1 -and $stt -le 100) {
                $num = ($stt - 1).ToString().PadLeft(2, '0')
                $desc = if ($cols.Count -ge 3) { $cols[2].Trim() } else { '' }
                [void]$result.Add([ordered]@{ num = $num; stt = $stt; anchor = $cols[1].Trim(); description = $desc; station = $tram })
            }
        }
    }
}
$json = $result | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText('D:\Projects\sieutrinho\body_anchors_parsed.json', $json, [System.Text.Encoding]::UTF8)
Write-Host "Extracted: $($result.Count) items"
$result | Select-Object -First 10 | ForEach-Object { Write-Host ($_.num + ' | ' + $_.station + ' | ' + $_.anchor + ' | ' + $_.description) }
