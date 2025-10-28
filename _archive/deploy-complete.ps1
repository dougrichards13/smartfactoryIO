# Smart Factory Complete Deployment Script
# Replaces WordPress site with React site on smartfactory.io

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

Write-Host "🎯 Smart Factory Complete Deployment to smartfactory.io" -ForegroundColor Magenta
Write-Host "Server: $Server" -ForegroundColor Cyan
Write-Host "Port: $Port" -ForegroundColor Cyan
Write-Host "Remote Path: $RemotePath" -ForegroundColor Cyan

if (!(Test-Path $DistPath)) {
    Write-Error "Build files not found at $DistPath. Run 'npm run build:force' first."
    exit 1
}

# Create SFTP batch commands
$sftpCommands = @"
cd $RemotePath
mkdir $BackupPath
mput * $BackupPath/
rm -rf wp-*
rm -rf xmlrpc.php
rm -rf index.php
rm -rf .htaccess
"@

# Add all files from dist to upload
Get-ChildItem -Path $DistPath -Recurse | ForEach-Object {
    if (!$_.PSIsContainer) {
        $relativePath = $_.FullName.Replace("$PWD\dist\", "").Replace('\', '/')
        $localPath = $_.FullName
        $sftpCommands += "`nput `"$localPath`" $relativePath"
    }
}

$sftpCommands += "`nquit"

# Write batch file
$batchFile = "sftp_deploy.bat"
$sftpCommands | Out-File -FilePath $batchFile -Encoding ASCII

if ($DryRun) {
    Write-Host "DRY RUN - Commands that would be executed:" -ForegroundColor Yellow
    Write-Host $sftpCommands -ForegroundColor Gray
    Remove-Item $batchFile
    return
}

Write-Host "🚀 Starting deployment..." -ForegroundColor Green
Write-Host "1. Connecting to GoDaddy server..." -ForegroundColor Cyan
Write-Host "2. Creating backup of current WordPress site..." -ForegroundColor Cyan  
Write-Host "3. Removing WordPress files..." -ForegroundColor Cyan
Write-Host "4. Uploading new React site..." -ForegroundColor Cyan

# Use Windows SFTP with expect-like behavior
$sftpScript = @"
echo Connecting to SFTP server...
echo $Password | sftp -oBatchMode=no -oStrictHostKeyChecking=no -P $Port $Username@$Server << 'EOF'
$sftpCommands
EOF
"@

$scriptFile = "deploy_script.ps1"
$sftpScript | Out-File -FilePath $scriptFile -Encoding ASCII

Write-Host "Generated deployment script. To execute manually:" -ForegroundColor Yellow
Write-Host "bash -c 'sshpass -p `"$Password`" sftp -oStrictHostKeyChecking=no -P $Port $Username@$Server < $batchFile'" -ForegroundColor White

Write-Host "`nTo complete deployment manually:" -ForegroundColor Green
Write-Host "1. Run: sftp -P $Port $Username@$Server" -ForegroundColor White
Write-Host "2. Enter password when prompted" -ForegroundColor White
Write-Host "3. Run these commands:" -ForegroundColor White
Write-Host "   cd /public_html" -ForegroundColor Gray
Write-Host "   mkdir /public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')" -ForegroundColor Gray
Write-Host "   mget * /public_html_backup_$(Get-Date -Format 'yyyy-MM-dd-HHmm')/" -ForegroundColor Gray
Write-Host "   rm -rf wp-*" -ForegroundColor Gray
Write-Host "   rm index.php" -ForegroundColor Gray
Write-Host "   lcd .\dist" -ForegroundColor Gray
Write-Host "   mput *" -ForegroundColor Gray
Write-Host "   quit" -ForegroundColor Gray

Write-Host "`n✅ Deployment script ready!" -ForegroundColor Green
Write-Host "Your smartfactory.io site will be replaced with the new React version." -ForegroundColor Green

# Cleanup
Remove-Item $batchFile -ErrorAction SilentlyContinue
Remove-Item $scriptFile -ErrorAction SilentlyContinue