# Quick SFTP Deployment Script
param(
    [string]$Username = "mbO4@AugWoi6JT",
    [string]$Password = "DoW6Hzo0FYN@A5",
    [string]$Server = "h8p.480.myftpupload.com",
    [int]$Port = 22
)

Write-Host "🚀 Deploying Smart Factory website..." -ForegroundColor Green
Write-Host "Server: $Server" -ForegroundColor Cyan

# Try using psftp (PuTTY SFTP) if available
$psftpPath = Get-Command psftp -ErrorAction SilentlyContinue
if ($psftpPath) {
    Write-Host "Using PuTTY SFTP..." -ForegroundColor Yellow
    
    # Create temporary script file
    $scriptContent = @"
cd /public_html
mkdir public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')
lcd .\dist
mput *
quit
"@
    
    $scriptFile = "temp_deploy.txt"
    $scriptContent | Out-File -FilePath $scriptFile -Encoding ASCII
    
    # Execute with psftp
    & psftp -b $scriptFile -l $Username -pw $Password $Server
    
    Remove-Item $scriptFile
} else {
    Write-Host "PuTTY SFTP not found. Trying alternative method..." -ForegroundColor Yellow
    
    # Alternative: Use .NET WebClient for simple upload (HTTP/FTP)
    # This is a fallback - you might need WinSCP for full SFTP support
    
    Write-Host @"
🔧 RECOMMENDED SOLUTION:

Since native SFTP tools aren't available, please:

1. Install WinSCP (free): https://winscp.net/eng/download.php
2. Or install PuTTY (includes psftp): https://www.putty.org/

Then run this script again, or use the manual steps:

MANUAL SFTP STEPS:
1. Connect: sftp $Username@$Server
2. Enter password when prompted: $Password
3. Navigate: cd /public_html
4. Create backup: mkdir public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')
5. Change local dir: lcd .\dist
6. Upload files: mput *
7. Quit: quit

"@ -ForegroundColor Green
}