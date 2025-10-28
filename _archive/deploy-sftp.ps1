# Smart Factory SFTP Deployment Script
param(
    [Parameter(Mandatory=$true)][string]$Username,
    [Parameter(Mandatory=$true)][string]$Password,
    [string]$Server = "h8p.480.myftpupload.com",
    [int]$Port = 22,
    [switch]$DryRun = $false
)

$DistPath = ".\dist"
$RemotePath = "/public_html"
$BackupPath = "/public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')"

function Test-WinSCP {
    try {
        & wincp --help > $null 2>&1
        return $true
    }
    catch {
        Write-Host "WinSCP not found. Let's try PowerShell SFTP instead..." -ForegroundColor Yellow
        return $false
    }
}

function Deploy-WithWinSCP {
    $scriptContent = @"
# WinSCP Script
open sftp://$Username`:$Password@$Server`:$Port
cd $RemotePath

# Create backup
mkdir $BackupPath
# Move existing files to backup (except .htaccess)
mv * $BackupPath/

# Upload new files
lcd $DistPath
put *

exit
"@

    $scriptPath = "deploy_script.tmp"
    $scriptContent | Out-File -FilePath $scriptPath -Encoding ASCII
    
    if ($DryRun) {
        Write-Host "DRY RUN - Would execute:" -ForegroundColor Yellow
        Write-Host $scriptContent -ForegroundColor Gray
        Remove-Item $scriptPath
        return
    }
    
    Write-Host "🚀 Deploying to Smart Factory..." -ForegroundColor Green
    & winscp /script=$scriptPath
    
    Remove-Item $scriptPath
}

function Deploy-WithPowerShell {
    Write-Host "Using PowerShell SFTP method..." -ForegroundColor Cyan
    
    # We'll use PSFTP or create a simple deployment approach
    Write-Host "This method requires additional setup. Let's use the manual approach instead." -ForegroundColor Yellow
    
    Write-Host @"
🚀 MANUAL SFTP DEPLOYMENT:

1. Download WinSCP (free): https://winscp.net/download/WinSCP-5.21.7-Setup.exe
2. Install and open WinSCP
3. Create new connection:
   - Protocol: SFTP
   - Host: $Server
   - Port: $Port
   - Username: $Username
   - Password: [your password]

4. Connect and navigate to /public_html/
5. Create backup folder: public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')
6. Move existing files to backup folder
7. Upload all contents from .\dist\ to /public_html/

"@ -ForegroundColor Green
}

# Main execution
Write-Host "🎯 Smart Factory Deployment" -ForegroundColor Magenta
Write-Host "Server: $Server" -ForegroundColor Cyan
Write-Host "Port: $Port" -ForegroundColor Cyan
Write-Host "Remote Path: $RemotePath" -ForegroundColor Cyan

if (!(Test-Path $DistPath)) {
    Write-Error "Build files not found. Run 'npm run build' first."
    exit 1
}

if (Test-WinSCP) {
    Deploy-WithWinSCP
} else {
    Deploy-WithPowerShell
}