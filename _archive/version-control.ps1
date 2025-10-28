# Smart Factory Website - Version Control Script
# Usage: .\version-control.ps1 [command] [version] [description]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("save", "rollback", "list", "current")]
    [string]$Command,
    
    [string]$Version = "",
    [string]$Description = ""
)

function Show-Usage {
    Write-Host "`nSmart Factory Website - Version Control" -ForegroundColor Cyan
    Write-Host "=======================================" -ForegroundColor Cyan
    Write-Host "`nUsage Examples:" -ForegroundColor Yellow
    Write-Host "  .\version-control.ps1 save v1.0 'Initial working version'" -ForegroundColor Green
    Write-Host "  .\version-control.ps1 save v1.1 'Updated hero section'" -ForegroundColor Green
    Write-Host "  .\version-control.ps1 list" -ForegroundColor Green
    Write-Host "  .\version-control.ps1 rollback v1.0" -ForegroundColor Green
    Write-Host "  .\version-control.ps1 current" -ForegroundColor Green
    Write-Host "`nVersion Format: v[MAJOR].[MINOR]" -ForegroundColor Yellow
    Write-Host "  - MAJOR: 1, 2, 3... (significant changes)"
    Write-Host "  - MINOR: 0-9 (small iterative changes)"
    Write-Host ""
}

switch ($Command) {
    "save" {
        if ([string]::IsNullOrEmpty($Version) -or [string]::IsNullOrEmpty($Description)) {
            Write-Host "Error: Version and description are required for save command" -ForegroundColor Red
            Show-Usage
            exit 1
        }
        
        Write-Host "Saving version $Version..." -ForegroundColor Green
        
        # Add all files to git
        git add .
        
        # Commit with descriptive message
        $commitMessage = "$Version - $Description"
        git commit -m $commitMessage
        
        # Create a tag for this version
        git tag -a $Version -m $Description
        
        Write-Host "✅ Version $Version saved successfully!" -ForegroundColor Green
        Write-Host "Description: $Description" -ForegroundColor Gray
    }
    
    "rollback" {
        if ([string]::IsNullOrEmpty($Version)) {
            Write-Host "Error: Version is required for rollback command" -ForegroundColor Red
            Show-Usage
            exit 1
        }
        
        Write-Host "Rolling back to version $Version..." -ForegroundColor Yellow
        
        # Check if tag exists
        $tagExists = git tag -l $Version
        if ([string]::IsNullOrEmpty($tagExists)) {
            Write-Host "Error: Version $Version not found!" -ForegroundColor Red
            Write-Host "Use '.\version-control.ps1 list' to see available versions" -ForegroundColor Yellow
            exit 1
        }
        
        # Reset to the tagged version
        git reset --hard $Version
        
        Write-Host "✅ Successfully rolled back to version $Version!" -ForegroundColor Green
        Write-Host "⚠️  Remember to restart the dev server: npm run dev" -ForegroundColor Yellow
    }
    
    "list" {
        Write-Host "`nAvailable Versions:" -ForegroundColor Cyan
        Write-Host "===================" -ForegroundColor Cyan
        
        $tags = git tag -l --sort=-version:refname
        if ([string]::IsNullOrEmpty($tags)) {
            Write-Host "No versions saved yet." -ForegroundColor Yellow
            Write-Host "Use '.\version-control.ps1 save v1.0 \"description\"' to save your first version" -ForegroundColor Gray
        } else {
            foreach ($tag in $tags) {
                $tagInfo = git show --quiet --format="%ai - %s" $tag
                Write-Host "$tag" -ForegroundColor Green -NoNewline
                Write-Host " | $tagInfo" -ForegroundColor Gray
            }
        }
        Write-Host ""
    }
    
    "current" {
        $currentHash = git rev-parse --short HEAD
        $currentTag = git describe --tags --exact-match HEAD 2>$null
        
        Write-Host "`nCurrent Status:" -ForegroundColor Cyan
        Write-Host "==============" -ForegroundColor Cyan
        
        if ([string]::IsNullOrEmpty($currentTag)) {
            Write-Host "Current commit: $currentHash (no version tag)" -ForegroundColor Yellow
            Write-Host "⚠️  Consider saving current state with: .\version-control.ps1 save v1.X 'description'" -ForegroundColor Gray
        } else {
            Write-Host "Current version: $currentTag ($currentHash)" -ForegroundColor Green
        }
        
        # Show if there are uncommitted changes
        $status = git status --porcelain
        if (![string]::IsNullOrEmpty($status)) {
            Write-Host "`n📝 Uncommitted changes detected:" -ForegroundColor Yellow
            git status --short
            Write-Host "`n💡 Save changes with: .\version-control.ps1 save v1.X 'description'" -ForegroundColor Gray
        } else {
            Write-Host "`n✅ No uncommitted changes" -ForegroundColor Green
        }
        Write-Host ""
    }
}

if ($Command -eq "save") {
    Write-Host "`n🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Test your changes at http://localhost:5173/" -ForegroundColor Gray
    Write-Host "2. If satisfied, make next change and save as v$($Version -replace 'v(\d+)\.(\d+)', { "v$($_.Groups[1].Value).$(([int]$_.Groups[2].Value) + 1)" })" -ForegroundColor Gray
    Write-Host "3. If issues, rollback with: .\version-control.ps1 rollback $Version" -ForegroundColor Gray
}

Write-Host ""
