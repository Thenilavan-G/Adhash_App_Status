# PowerShell Setup Script for Playwright TypeScript Project
# This script installs all dependencies and sets up the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Google Play Store Automation Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Install npm dependencies
Write-Host ""
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Install Playwright browsers
Write-Host ""
Write-Host "Installing Playwright browsers..." -ForegroundColor Yellow
npx playwright install chromium

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Playwright browsers installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install Playwright browsers" -ForegroundColor Red
    exit 1
}

# Setup complete
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup completed successfully! 🎉" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Yellow
Write-Host "  npm test              - Run tests in headless mode" -ForegroundColor White
Write-Host "  npm run test:headed   - Run tests in headed mode" -ForegroundColor White
Write-Host "  npm run test:debug    - Run tests in debug mode" -ForegroundColor White
Write-Host "  npm run test:ui       - Run tests in UI mode" -ForegroundColor White
Write-Host "  npm run test:report   - View HTML report" -ForegroundColor White
Write-Host ""
Write-Host "To run your first test:" -ForegroundColor Yellow
Write-Host "  npm test" -ForegroundColor White
Write-Host ""

