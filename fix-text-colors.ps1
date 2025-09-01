# PowerShell script to fix text colors across main components
# Replace text-muted-foreground with white variants for better readability

$components = @(
    "MethodSection.tsx",
    "AIAcceleratorSection.tsx", 
    "ContactSection.tsx",
    "SocialSection.tsx",
    "TeamSection.tsx",
    "ResultsSection.tsx",
    "ServicesSection.tsx"
)

Write-Host "🔧 Fixing text colors for better readability..." -ForegroundColor Cyan

foreach ($component in $components) {
    $filePath = "components\$component"
    if (Test-Path $filePath) {
        Write-Host "Updating $component..." -ForegroundColor Yellow
        
        # Read content
        $content = Get-Content $filePath -Raw
        
        # Replace different variants
        $content = $content -replace 'text-muted-foreground', 'text-white/80'
        
        # Write back
        Set-Content $filePath $content -Encoding UTF8
        
        Write-Host "✅ Updated $component" -ForegroundColor Green
    } else {
        Write-Host "⚠️  File not found: $component" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Text color fixes complete!" -ForegroundColor Green
Write-Host "All body text should now be white/transparent white for better readability." -ForegroundColor White
