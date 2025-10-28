# Smart Factory PowerShell SFTP Deployment Script
param(
    [Parameter(Mandatory=$true)][string]$Username,
    [Parameter(Mandatory=$true)][string]$Password,
    [string]$Server = "h8p.480.myftpupload.com",
    [int]$Port = 22,
    [switch]$DryRun = $false
)

$DistPath = ".\dist"
$RemotePath = "/public_html"

function Deploy-WithSFTP {
    Write-Host "🚀 Deploying Smart Factory website to GoDaddy..." -ForegroundColor Green
    Write-Host "Server: $Server" -ForegroundColor Cyan
    Write-Host "Port: $Port" -ForegroundColor Cyan
    Write-Host "Remote Path: $RemotePath" -ForegroundColor Cyan
    
    if ($DryRun) {
        Write-Host "DRY RUN - Files that would be uploaded:" -ForegroundColor Yellow
        Get-ChildItem -Path $DistPath -Recurse | ForEach-Object {
            if (!$_.PSIsContainer) {
                Write-Host "  $($_.FullName.Replace($PWD, '.'))" -ForegroundColor Gray
            }
        }
        return
    }
    
    # Generate PSFTP script
    $psftp_commands = @"
open $Server $Port
$Username
$Password
cd $RemotePath
mkdir backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')
"@

    # Add upload commands for each file
    Get-ChildItem -Path $DistPath -Recurse | ForEach-Object {
        if (!$_.PSIsContainer) {
            $relativePath = $_.FullName.Replace("$PWD\dist\", "").Replace('\', '/')
            $psftp_commands += "`nput `"$($_.FullName)`" $relativePath"
        }
    }
    
    $psftp_commands += "`nquit"
    
    # Save script to temp file
    $scriptFile = "psftp_script.tmp"
    $psftp_commands | Out-File -FilePath $scriptFile -Encoding ASCII
    
    Write-Host "Generated PSFTP script. You can manually run:" -ForegroundColor Yellow
    Write-Host "psftp -b $scriptFile" -ForegroundColor White
    Write-Host "" 
    Write-Host "Or use an FTP client with these details:" -ForegroundColor Green
    Write-Host "Protocol: SFTP" -ForegroundColor White
    Write-Host "Host: $Server" -ForegroundColor White  
    Write-Host "Port: $Port" -ForegroundColor White
    Write-Host "Username: $Username" -ForegroundColor White
    Write-Host "Remote directory: $RemotePath" -ForegroundColor White
    Write-Host "Local directory: $DistPath" -ForegroundColor White
    
    # Try using built-in SSH client (if available in Windows 10+)
    try {
        Write-Host "Attempting to use Windows built-in SSH/SFTP..." -ForegroundColor Cyan
        $sftpConnection = "sftp -oPort=$Port $Username@$Server"
        Write-Host "Run this command to connect manually:" -ForegroundColor Yellow
        Write-Host $sftpConnection -ForegroundColor White
        Write-Host "Then upload files from the 'dist' folder to '$RemotePath'" -ForegroundColor Yellow
    }
    catch {
        Write-Host "Built-in SFTP not available. Please use manual method above." -ForegroundColor Yellow
    }
    
    # Clean up
    if (Test-Path $scriptFile) {
        Remove-Item $scriptFile
    }
}

# Main execution
Write-Host "🎯 Smart Factory PowerShell Deployment" -ForegroundColor Magenta

if (!(Test-Path $DistPath)) {
    Write-Error "Build files not found at $DistPath. Run 'npm run build:force' first."
    exit 1
}

Deploy-WithSFTP
Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green