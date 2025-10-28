# Smart Factory Deployment Script
# This script helps deploy the React build to GoDaddy hosting

param(
    [string]$Mode = "prepare",  # prepare, backup, deploy
    [string]$FtpServer = "",
    [string]$FtpUser = "",
    [string]$FtpPassword = ""
)

$DistPath = ".\dist"
$BackupPath = ".\backup-$(Get-Date -Format 'yyyy-MM-dd-HHmm')"

function Test-DistFolder {
    if (!(Test-Path $DistPath)) {
        Write-Error "Dist folder not found. Run 'npm run build' first."
        exit 1
    }
    
    $requiredFiles = @("index.html", "assets", "images")
    foreach ($file in $requiredFiles) {
        if (!(Test-Path "$DistPath\$file")) {
            Write-Warning "Missing: $file"
        }
    }
}

function Create-DeploymentPackage {
    Write-Host "Creating deployment package..." -ForegroundColor Green
    
    # Create a zip file with all dist contents
    $zipPath = "smartfactory-deployment-$(Get-Date -Format 'yyyy-MM-dd-HHmm').zip"
    Compress-Archive -Path "$DistPath\*" -DestinationPath $zipPath -Force
    
    Write-Host "✅ Deployment package created: $zipPath" -ForegroundColor Green
    return $zipPath
}

function Show-DeploymentInfo {
    Write-Host @"
🚀 DEPLOYMENT OPTIONS:

1. MANUAL UPLOAD (Safest):
   - Created zip package above
   - Login to GoDaddy cPanel/File Manager
   - Backup current WordPress site
   - Upload and extract in public_html

2. FTP UPLOAD (Command line):
   - Run: .\deploy.ps1 -Mode deploy -FtpServer "your-server" -FtpUser "username" -FtpPassword "password"

3. STAGING FIRST (Recommended):
   - Create staging.smartfactory.io subdomain
   - Test there before going live

⚠️  IMPORTANT:
   - This will REPLACE your WordPress site
   - Make sure you have WordPress backups
   - Consider keeping WordPress in a subfolder
"@ -ForegroundColor Cyan
}

# Main execution
switch ($Mode) {
    "prepare" {
        Test-DistFolder
        $packagePath = Create-DeploymentPackage
        Show-DeploymentInfo
    }
    
    "deploy" {
        if (!$FtpServer -or !$FtpUser) {
            Write-Error "FTP credentials required for deployment"
            exit 1
        }
        
        Write-Host "🚨 This will replace your live WordPress site!" -ForegroundColor Red
        $confirm = Read-Host "Type 'DEPLOY' to continue"
        
        if ($confirm -ne "DEPLOY") {
            Write-Host "Deployment cancelled." -ForegroundColor Yellow
            exit 0
        }
        
        # FTP deployment logic would go here
        Write-Host "FTP deployment not implemented yet - use manual upload for safety" -ForegroundColor Yellow
    }
}