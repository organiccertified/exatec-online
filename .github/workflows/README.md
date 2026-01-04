# GitHub Actions Workflows

This directory contains automated deployment workflows for the project.

## Available Workflows

### 1. Deploy to Hostinger (FTP)
**File:** `deploy-hostinger.yml`

Deploys the frontend to Hostinger using FTP.

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Required Secrets:**
- `FTP_SERVER` - Your FTP server address
- `FTP_USERNAME` - Your FTP username
- `FTP_PASSWORD` - Your FTP password

### 2. Deploy to Hostinger (SFTP)
**File:** `deploy-hostinger-sftp.yml`

Deploys the frontend to Hostinger using SFTP (more secure).

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Required Secrets:**
- `HOSTINGER_SSH_PRIVATE_KEY`
- `HOSTINGER_SSH_HOST`
- `HOSTINGER_SSH_USER`
- `HOSTINGER_SSH_PORT` (optional, defaults to 22)

## Setup

See `GITHUB_ACTIONS_SETUP.md` in the root directory for detailed setup instructions.

## Usage

### Automatic Deployment
Simply push to the `main` branch:
```bash
git push origin main
```

### Manual Deployment
1. Go to **Actions** tab in GitHub
2. Select the workflow you want to run
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Workflow Steps

1. **Checkout code** - Gets the latest code
2. **Setup Node.js** - Installs Node.js 18 with caching
3. **Install dependencies** - Runs `npm ci` in frontend directory
4. **Build frontend** - Runs `npm run build` to create production build
5. **Deploy** - Uploads `frontend/dist/` to Hostinger's `public_html/`

## Troubleshooting

Check the workflow logs in the **Actions** tab for detailed error messages.

Common issues:
- **FTP connection errors**: Verify server address and credentials
- **Build failures**: Check Node.js version and dependencies
- **Deployment errors**: Verify Hostinger directory permissions

For more help, see `GITHUB_ACTIONS_SETUP.md`.

