# Quick fix for all motion imports
$files = Get-ChildItem -Path "components" -Filter "*.tsx" -Recurse
foreach ($file in $files) {
    (Get-Content $file.FullName) -replace 'motion/react', 'framer-motion' | Set-Content $file.FullName
    Write-Host "Fixed: $($file.Name)"
}

# Fix specific UI component import issues
$badgeFile = "components/ui/badge.tsx"
if (Test-Path $badgeFile) {
    (Get-Content $badgeFile) -replace '@radix-ui/react-slot@1\.1\.2', '@radix-ui/react-slot' | Set-Content $badgeFile
    Write-Host "Fixed: badge.tsx"
}

$buttonFile = "components/ui/button.tsx"  
if (Test-Path $buttonFile) {
    (Get-Content $buttonFile) -replace '@radix-ui/react-slot@1\.1\.2', '@radix-ui/react-slot' | Set-Content $buttonFile
    Write-Host "Fixed: button.tsx"
}

Write-Host "All imports fixed! You can now run: npm run dev"
