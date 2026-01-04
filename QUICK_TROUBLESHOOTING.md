# Quick Troubleshooting Guide

## 🚨 Deployment Didn't Happen? Start Here!

### 1. Check GitHub Actions (30 seconds)

1. Go to: `https://github.com/organiccertified/exatec-online/actions`
2. Look for "Deploy to Hostinger" workflow
3. Check the latest run:
   - ✅ **Green** = Success (check if files are on server)
   - ❌ **Red** = Failed (click to see error)
   - 🟡 **Yellow** = Running (wait for completion)

**If workflow didn't run:**
- Did you push to `main` branch? (Workflow only runs on `main`)
- Go to Actions → Deploy to Hostinger → Run workflow (manual trigger)

### 2. Check Workflow Logs (1 minute)

1. Click on the workflow run
2. Click on "build-and-deploy" job
3. Expand failed step to see error

**Common errors:**

| Error | Quick Fix |
|-------|-----------|
| "FTP connection failed" | Check `FTP_SERVER` secret is correct |
| "Authentication failed" | Check `FTP_USERNAME` and `FTP_PASSWORD` secrets |
| "Build failed" | Test build locally: `cd frontend && npm run build` |
| "Directory not found" | Verify FTP directory is `/public_html/` |

### 3. Verify GitHub Secrets (1 minute)

Go to: `https://github.com/organiccertified/exatec-online/settings/secrets/actions`

**Required secrets:**
- ✅ `FTP_SERVER` - Your FTP server address
- ✅ `FTP_USERNAME` - Your FTP username  
- ✅ `FTP_PASSWORD` - Your FTP password

**If missing:**
- Add them from Hostinger Control Panel → Files → FTP Accounts

### 4. Test FTP Manually (2 minutes)

**Using FileZilla or any FTP client:**
1. Connect with same credentials from secrets
2. If connection fails → Secrets are wrong
3. If connection works → Issue is with workflow

### 5. Check Files on Server (1 minute)

**Via Hostinger File Manager:**
1. Log into Hostinger Control Panel
2. Go to Files → File Manager
3. Navigate to `public_html/`
4. Check if files exist:
   - `index.html` ✅
   - `.htaccess` ✅
   - `assets/` folder ✅

**If files missing:**
- Deployment didn't complete
- Check workflow logs for errors

## 🔧 Quick Fixes

### Fix: Wrong FTP Credentials
1. Get correct credentials from Hostinger
2. Update GitHub Secrets
3. Re-run workflow manually

### Fix: Build Fails
```bash
cd frontend
npm ci
npm run build
# Fix any errors, then commit and push
```

### Fix: Files Deployed But Site Not Working
- Check `.htaccess` is in `public_html/`
- Clear browser cache (Ctrl+F5)
- Check file permissions (should be 644 for files)

### Fix: 404 Errors on Routes
- Verify `.htaccess` exists in `public_html/`
- Check it has React Router rewrite rules
- Contact Hostinger to enable mod_rewrite

## 📞 Still Stuck?

1. **Check detailed guide:** `TROUBLESHOOTING_DEPLOYMENT.md`
2. **Check workflow logs:** Copy error messages
3. **Contact support:**
   - GitHub Actions issues → GitHub support
   - Hostinger issues → Hostinger support

## ✅ Success Checklist

- [ ] Workflow shows green checkmark
- [ ] Files exist in `public_html/` on Hostinger
- [ ] Website loads at your domain
- [ ] All routes work (/, /register, /board, /contact)
- [ ] No 404 errors when refreshing pages

---

**For detailed troubleshooting, see:** `TROUBLESHOOTING_DEPLOYMENT.md`

