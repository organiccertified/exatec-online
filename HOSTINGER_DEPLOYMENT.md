# Hostinger Deployment Guide

This project is configured for deployment on Hostinger hosting.

## Hostinger Requirements

- **Hosting Plan**: Business or Cloud hosting (required for Node.js support)
- **Node.js**: Supported on Business and Cloud plans
- **React/Vite**: Fully supported

## Project Structure for Hostinger

```
amigosExatec/
├── frontend/
│   ├── dist/              # Build output (deploy this to public_html)
│   ├── public/
│   │   └── .htaccess      # Apache configuration for SPA routing
│   └── ...
├── backend/               # Node.js backend (if using Node.js hosting)
└── ...
```

## Deployment Options

### Option 1: Static Frontend Only (Recommended for Start)

Deploy only the built frontend as static files.

#### Steps:

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `dist/` folder with all static files.

2. **Upload to Hostinger:**
   - Log into your Hostinger control panel
   - Go to File Manager
   - Navigate to `public_html` (or your domain's root directory)
   - Upload all contents from `frontend/dist/` to `public_html/`
   - Make sure `.htaccess` is uploaded (it's in `frontend/public/.htaccess`)

3. **Verify:**
   - Visit your domain
   - All routes should work (React Router will handle routing)

### Option 2: Full Stack (Frontend + Backend)

If you need the backend API running on Hostinger.

#### Steps:

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload frontend:**
   - Upload `frontend/dist/` contents to `public_html/`

3. **Set up backend:**
   - Create a subdomain or use a subdirectory for the API
   - Upload backend files to a separate directory (e.g., `api/`)
   - Install Node.js dependencies on Hostinger
   - Configure Node.js app in Hostinger control panel
   - Set the entry point to `server.js`

4. **Update frontend API URLs:**
   - Update API endpoints in your frontend code to point to your backend URL
   - Rebuild and redeploy frontend

## Hostinger-Specific Configuration

### .htaccess File

The `.htaccess` file in `frontend/public/` is automatically copied to `dist/` during build. It:
- Enables React Router (SPA routing)
- Enables compression
- Sets cache headers
- Adds security headers

### Build Configuration

The `vite.config.js` is configured with:
- Relative paths (`base: './'`) for Hostinger compatibility
- Optimized chunk splitting
- Production-ready settings

## Environment Variables

If you need environment variables:

1. Create `.env.production` in `frontend/`:
   ```
   VITE_API_URL=https://your-api-domain.com
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

## Database Configuration

If using a database:
- MySQL/MariaDB: Available on all Hostinger plans
- Use Hostinger's database manager in the control panel
- Update backend connection strings

## Troubleshooting

### React Router not working:
- Ensure `.htaccess` is in the root of `public_html/`
- Check that mod_rewrite is enabled on Hostinger
- Verify file permissions (644 for files, 755 for directories)

### 404 errors:
- Check that all files from `dist/` are uploaded
- Verify `.htaccess` is present and correct
- Check Hostinger error logs

### API not connecting:
- Verify backend is running
- Check CORS settings in backend
- Ensure API URL is correct in frontend

## Quick Deploy Script

Create a deployment script:

```bash
#!/bin/bash
# deploy.sh

echo "Building frontend..."
cd frontend
npm run build

echo "Build complete! Upload the contents of frontend/dist/ to Hostinger's public_html/"
```

## Support

For Hostinger-specific issues:
- Check Hostinger documentation
- Contact Hostinger support
- Review Hostinger control panel settings

