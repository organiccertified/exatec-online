#!/bin/bash

# Hostinger Deployment Script
# This script builds the frontend for production deployment

echo "🚀 Starting Hostinger deployment build..."

# Navigate to frontend directory
cd frontend || exit

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Build for production
echo "🔨 Building frontend for production..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
  echo "✅ Build successful!"
  echo ""
  echo "📋 Next steps:"
  echo "1. Upload all contents from 'frontend/dist/' to Hostinger's public_html/"
  echo "2. Make sure .htaccess file is included"
  echo "3. Verify file permissions (644 for files, 755 for directories)"
  echo ""
  echo "📁 Build output location: frontend/dist/"
else
  echo "❌ Build failed! Check the error messages above."
  exit 1
fi

