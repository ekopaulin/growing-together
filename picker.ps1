Add-Type -AssemblyName System.Windows.Forms
$dlg = New-Object System.Windows.Forms.OpenFileDialog
$dlg.Title = 'Sélectionnez vos vidéos'
$dlg.Filter = 'Vidéos (*.mp4;*.webm;*.mov)|*.mp4;*.webm;*.mov'
$dlg.Multiselect = $true
$res = $dlg.ShowDialog()
if ($res -eq 'OK') {
    $dest = 'C:\Users\ALTA GRACIA DIVINA\.gemini\antigravity\scratch\beetogrow-v2\public\videos'
    if (!(Test-Path $dest)) {
        New-Item -Path $dest -ItemType Directory -Force | Out-Null
    }
    foreach ($file in $dlg.FileNames) {
        Copy-Item $file -Destination $dest -Force
    }
    Write-Host 'SUCCESS'
} else {
    Write-Host 'CANCELLED'
}
