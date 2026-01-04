@echo off
REM Hostinger Deployment Script for Windows
REM This script builds the frontend for production deployment

echo 🚀 Starting Hostinger deployment build...

REM Navigate to frontend directory
cd frontend
if errorlevel 1 (
    echo ❌ Failed to navigate to frontend directory
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
)

REM Build for production
echo 🔨 Building frontend for production...
call npm run build

REM Check if build was successful
if exist "dist" (
    echo ✅ Build successful!
    echo.
    echo 📋 Next steps:
    echo 1. Upload all contents from 'frontend\dist\' to Hostinger's public_html/
    echo 2. Make sure .htaccess file is included
    echo 3. Verify file permissions (644 for files, 755 for directories)
    echo.
    echo 📁 Build output location: frontend\dist\
) else (
    echo ❌ Build failed! Check the error messages above.
    exit /b 1
)

pause

