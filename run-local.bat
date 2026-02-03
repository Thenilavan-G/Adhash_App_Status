@echo off
echo.
echo ========================================
echo   Running Local Test and Email
echo ========================================
echo.

echo Step 1: Generating Report...
node generate-report.js
if errorlevel 1 (
    echo Warning: Report generation had issues
)

echo.
echo Step 2: Sending Email...
node send-report-only.js

echo.
echo ========================================
echo   Process Complete!
echo ========================================
echo.
pause

