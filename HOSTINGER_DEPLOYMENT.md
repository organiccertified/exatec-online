# Hostinger Deployment Guide

This project is configured for deployment on Hostinger hosting with **automated GitHub Actions deployment**.

## Hostinger Requirements

- **Hosting Plan**: Business or Cloud hosting (required for Node.js support)
- **Node.js**: Supported on Business and Cloud plans
- **React/Vite**: Fully supported

## 🚀 Automated Deployment via GitHub Actions

The project includes automated deployment workflows that build and deploy to Hostinger automatically when you push to the `main` branch.

### Available Workflows

1. **FTP Deployment** (`.github/workflows/deploy-hostinger.yml`) - Recommended for most users
2. **SFTP Deployment** (`.github/workflows/deploy-hostinger-sftp.yml`) - More secure, requires SSH access

### Setup Instructions

#### Option 1: FTP Deployment (Currently Active)

1. **Get FTP credentials from Hostinger:**
   - Log into Hostinger control panel
   - Go to **Files** → **FTP Accounts**
   - Note your FTP server, username, and password

2. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret** and add:
     - `FTP_SERVER` - Your FTP server (e.g., `ftp.yourdomain.com` or IP address)
     - `FTP_USERNAME` - Your FTP username
     - `FTP_PASSWORD` - Your FTP password

3. **Enable the workflow:**
   - The workflow is already configured in `.github/workflows/deploy-hostinger.yml`
   - It will automatically run on pushes to `main` branch
   - You can also trigger it manually from the **Actions** tab

**Quick Start:** See `QUICK_START_DEPLOYMENT.md` for a step-by-step guide.

#### Option 2: SFTP Deployment (More Secure)

1. **Get SSH credentials from Hostinger:**
   - Log into Hostinger control panel
   - Go to **Advanced** → **SSH Access**
   - Generate or use existing SSH key
   - Note your SSH host, username, and port

2. **Add GitHub Secrets:**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret** and add:
     - `HOSTINGER_SSH_PRIVATE_KEY` - Your private SSH key (entire key including `-----BEGIN` and `-----END`)
     - `HOSTINGER_SSH_HOST` - Your SSH host (e.g., `ssh.yourdomain.com`)
     - `HOSTINGER_SSH_USER` - Your SSH username
     - `HOSTINGER_SSH_PORT` - SSH port (usually `22`, optional)

3. **Enable the workflow:**
   - The workflow is in `.github/workflows/deploy-hostinger-sftp.yml`
   - Rename or delete the FTP workflow if using SFTP

### How It Works

1. **On push to `main` branch:**
   - GitHub Actions automatically triggers
   - Installs Node.js dependencies
   - Builds the frontend (`npm run build`)
   - Deploys `frontend/dist/` to Hostinger's `public_html/`

2. **Manual deployment:**
   - Go to **Actions** tab in GitHub
   - Select **Deploy to Hostinger**
   - Click **Run workflow**

### Workflow Features

- ✅ Automatic builds on push to main
- ✅ Manual deployment option
- ✅ Only deploys built files (excludes node_modules, .git, etc.)
- ✅ Preserves `.htaccess` file
- ✅ Deployment status notifications

## Manual Deployment (Alternative)

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

