# Deployment Checklist for Hostinger

Use this checklist to ensure everything is ready before deploying to Hostinger.

## ✅ Pre-Deployment Checklist

### 1. GitHub Secrets Configuration

- [ ] **FTP_SERVER** - Your Hostinger FTP server address
  - Get from: Hostinger Control Panel → Files → FTP Accounts
  - Example: `ftp.yourdomain.com` or IP address

- [ ] **FTP_USERNAME** - Your FTP username
  - Get from: Hostinger Control Panel → Files → FTP Accounts

- [ ] **FTP_PASSWORD** - Your FTP password
  - Get from: Hostinger Control Panel → Files → FTP Accounts

**To add secrets:**
1. Go to: `https://github.com/organiccertified/exatec-online/settings/secrets/actions`
2. Click "New repository secret" for each one
3. Add the secret name and value
4. Click "Add secret"

### 2. Build Verification

- [x] Build works locally (`npm run build` in frontend directory)
- [x] `.htaccess` file exists in `frontend/public/`
- [x] `robots.txt` exists in `frontend/public/`
- [x] `sitemap.xml` exists in `frontend/public/`
- [x] Build output (`frontend/dist/`) contains all necessary files

### 3. File Verification

Verify these files are in `frontend/public/` (will be copied to dist):
- [x] `.htaccess` - React Router SPA rewrite rules
- [x] `robots.txt` - SEO indexing
- [x] `sitemap.xml` - Site map for search engines

### 4. Code Status

- [ ] All changes committed to Git
- [ ] Code is on `main` branch
- [ ] No uncommitted changes (or intentionally left for deployment)

### 5. Hostinger Account

- [ ] Hostinger account is active
- [ ] FTP access is enabled
- [ ] Domain is configured and pointing to Hostinger
- [ ] `public_html` directory exists and is accessible

## 🚀 Deployment Steps

### Option 1: Automatic Deployment (Recommended)

1. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Monitor deployment:**
   - Go to: `https://github.com/organiccertified/exatec-online/actions`
   - Watch the "Deploy to Hostinger" workflow
   - Wait for it to complete (usually 2-5 minutes)

3. **Verify deployment:**
   - Visit your website
   - Check all routes work (/, /register, /board, /contact)
   - Test refreshing pages (should not show 404)

### Option 2: Manual Deployment

1. **Go to GitHub Actions:**
   - Navigate to: `https://github.com/organiccertified/exatec-online/actions`

2. **Run workflow manually:**
   - Click "Deploy to Hostinger" workflow
   - Click "Run workflow"
   - Select `main` branch
   - Click "Run workflow"

3. **Monitor and verify** (same as Option 1)

## 🔍 Post-Deployment Verification

After deployment, verify:

- [ ] Website loads at your domain
- [ ] Home page (/) works correctly
- [ ] Register page (/register) works and refreshes without 404
- [ ] Board page (/board) works and refreshes without 404
- [ ] Contact page (/contact) works and refreshes without 404
- [ ] Images load correctly
- [ ] CSS styles are applied
- [ ] JavaScript functionality works
- [ ] `.htaccess` file is in `public_html/` (check via FTP or File Manager)
- [ ] No console errors in browser

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs in GitHub Actions

### FTP Connection Fails
- Verify FTP credentials are correct
- Check FTP server address
- Ensure FTP is enabled on Hostinger
- Try using IP address instead of domain

### Files Not Deploying
- Check workflow logs for errors
- Verify `frontend/dist/` exists after build
- Ensure `.htaccess` is in `frontend/public/`

### 404 Errors on Refresh
- Verify `.htaccess` is in `public_html/`
- Check that mod_rewrite is enabled on Hostinger
- Verify file permissions (644 for files, 755 for directories)

### Styles/Images Not Loading
- Check file paths are relative (base: './' in vite.config.js)
- Verify assets are in `dist/assets/`
- Clear browser cache

## 📋 Quick Commands

```bash
# Test build locally
cd frontend
npm run build

# Check build output
ls -la frontend/dist/

# Verify .htaccess is included
ls -la frontend/dist/.htaccess

# Commit and push for deployment
git add .
git commit -m "Deploy to Hostinger"
git push origin main
```

## 📚 Documentation

- `QUICK_START_DEPLOYMENT.md` - Quick setup guide
- `GITHUB_ACTIONS_SETUP.md` - Detailed setup instructions
- `HOSTINGER_DEPLOYMENT.md` - Complete deployment guide

## ✅ Ready to Deploy?

Once all items above are checked, you're ready to deploy!

**Next step:** Push to `main` branch or run workflow manually.

