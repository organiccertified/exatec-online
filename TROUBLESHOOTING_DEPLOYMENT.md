# Troubleshooting Deployment Issues

This guide helps you diagnose and fix deployment problems when deploying to Hostinger via GitHub Actions.

## 🔍 Step 1: Check GitHub Actions Status

### Where to Look

1. **Go to Actions Tab:**
   - Navigate to: `https://github.com/organiccertified/exatec-online/actions`

2. **Find Your Workflow Run:**
   - Look for "Deploy to Hostinger" workflow
   - Check the latest run (should be at the top)

3. **Check Status:**
   - ✅ **Green checkmark** = Success (but files might still not be on server)
   - ❌ **Red X** = Failed (check logs)
   - 🟡 **Yellow circle** = In progress (wait for completion)

### If Workflow Didn't Run At All

**Possible causes:**
- [ ] You didn't push to `main` branch (workflow only runs on `main`)
- [ ] Workflow file has syntax errors
- [ ] GitHub Actions is disabled for the repository

**Solutions:**
```bash
# Check current branch
git branch

# If not on main, switch and push
git checkout main
git push origin main

# Or manually trigger workflow:
# Go to Actions → Deploy to Hostinger → Run workflow
```

## 🔍 Step 2: Check Workflow Logs

### How to Read Logs

1. Click on the workflow run
2. Click on the job name ("build-and-deploy")
3. Expand each step to see detailed logs

### Common Error Messages

#### ❌ "FTP connection failed" or "Connection timeout"

**Causes:**
- Wrong FTP server address
- FTP not enabled on Hostinger
- Firewall blocking connection
- Wrong port

**Solutions:**
- [ ] Verify `FTP_SERVER` secret is correct
  - Check Hostinger Control Panel → Files → FTP Accounts
  - Try using IP address instead of domain
  - Format: `ftp.yourdomain.com` or `123.45.67.89`
- [ ] Verify FTP is enabled on Hostinger
  - Go to Hostinger Control Panel
  - Check FTP Accounts section
  - Ensure FTP access is active
- [ ] Check if port 21 is open (standard FTP port)

#### ❌ "Authentication failed" or "Login failed"

**Causes:**
- Wrong username or password
- Extra spaces in secrets
- Special characters not encoded

**Solutions:**
- [ ] Double-check `FTP_USERNAME` secret
  - Copy exactly from Hostinger (no extra spaces)
  - Format: `username@yourdomain.com` or just `username`
- [ ] Double-check `FTP_PASSWORD` secret
  - Copy exactly from Hostinger
  - If password has special characters, ensure they're correct
  - Try resetting FTP password in Hostinger and updating secret
- [ ] Verify secrets are set correctly:
  - Go to: `https://github.com/organiccertified/exatec-online/settings/secrets/actions`
  - Check all three secrets exist: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

#### ❌ "Build failed" or "npm ci failed"

**Causes:**
- Missing dependencies
- Node.js version mismatch
- Package-lock.json issues

**Solutions:**
- [ ] Check build logs for specific error
- [ ] Verify `frontend/package-lock.json` exists
- [ ] Test build locally:
  ```bash
  cd frontend
  npm ci
  npm run build
  ```
- [ ] If local build fails, fix issues first
- [ ] Commit `package-lock.json` if it was missing

#### ❌ "Directory not found" or "Permission denied"

**Causes:**
- Wrong server directory path
- FTP user doesn't have write permissions
- Directory doesn't exist

**Solutions:**
- [ ] Verify FTP account directory is `/public_html/`
  - Check in Hostinger Control Panel → FTP Accounts
  - Ensure directory is set to `/public_html/`
- [ ] Check FTP user permissions
  - FTP user should have write access to `/public_html/`
  - Contact Hostinger support if permissions are wrong
- [ ] Verify directory exists on server
  - Log into Hostinger File Manager
  - Check that `public_html/` exists

#### ❌ "Workflow completed but files not on server"

**Causes:**
- Files deployed to wrong directory
- Files overwritten by another process
- Cache issues

**Solutions:**
- [ ] Check File Manager in Hostinger
  - Navigate to `public_html/`
  - Look for `index.html` and other files
  - Check file timestamps (should match deployment time)
- [ ] Verify `.htaccess` is present
  - Should be in root of `public_html/`
  - If missing, deployment might have failed silently
- [ ] Check if files are in subdirectory
  - Look for `dist/` folder in `public_html/`
  - If found, files deployed to wrong location
- [ ] Clear browser cache
  - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

## 🔍 Step 3: Verify GitHub Secrets

### Check Secrets Are Set

1. Go to: `https://github.com/organiccertified/exatec-online/settings/secrets/actions`
2. Verify these secrets exist:
   - ✅ `FTP_SERVER`
   - ✅ `FTP_USERNAME`
   - ✅ `FTP_PASSWORD`

### Test Secrets Manually

**Using FTP Client (FileZilla, WinSCP, etc.):**
1. Download an FTP client
2. Connect using the same credentials from secrets
3. If connection fails, secrets are wrong
4. If connection works, issue is with GitHub Actions workflow

**Connection details:**
- Host: Your `FTP_SERVER` value
- Username: Your `FTP_USERNAME` value
- Password: Your `FTP_PASSWORD` value
- Port: 21 (default FTP)

## 🔍 Step 4: Check Build Output

### Verify Build Succeeds Locally

```bash
cd frontend
npm ci
npm run build
```

**Expected output:**
- Should create `dist/` folder
- Should contain `index.html`
- Should contain `assets/` folder
- Should contain `.htaccess` file

**If build fails locally:**
- Fix the errors first
- Commit and push fixes
- Then try deployment again

### Check What Gets Deployed

The workflow deploys `frontend/dist/` to `/public_html/`

**Files that should be deployed:**
- `index.html`
- `.htaccess`
- `robots.txt`
- `sitemap.xml`
- `assets/` folder (with CSS, JS, images)

## 🔍 Step 5: Check Hostinger Server

### Via File Manager

1. Log into Hostinger Control Panel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html/`
4. Check:
   - [ ] Files exist (index.html, .htaccess, etc.)
   - [ ] File timestamps are recent
   - [ ] File sizes match local build

### Via FTP Client

1. Connect using FTP credentials
2. Navigate to `/public_html/`
3. Check files match `frontend/dist/` locally

### Check File Permissions

Files should have:
- **644** for files (read/write for owner, read for others)
- **755** for directories (read/write/execute for owner, read/execute for others)

**To fix permissions:**
- Use Hostinger File Manager → Right-click file → Change Permissions
- Or contact Hostinger support

## 🔍 Step 6: Common Issues & Solutions

### Issue: "Workflow runs but nothing happens"

**Check:**
1. Workflow logs show "Deployment completed successfully"
2. But files aren't on server

**Solution:**
- Check if files deployed to wrong location
- Verify FTP user has write permissions
- Check Hostinger error logs

### Issue: "404 errors on all routes"

**Check:**
- `.htaccess` file is in `public_html/`
- File has correct content (React Router rewrite rules)
- mod_rewrite is enabled on Hostinger

**Solution:**
- Verify `.htaccess` exists and has content
- Contact Hostinger support to enable mod_rewrite
- Check Apache error logs

### Issue: "Styles/images not loading"

**Check:**
- File paths in browser console
- Assets folder exists in `public_html/assets/`
- Base path in `vite.config.js` is `'./'`

**Solution:**
- Verify `base: './'` in `frontend/vite.config.js`
- Check assets are in correct location
- Clear browser cache

### Issue: "Deployment takes too long"

**Normal:**
- Build: 1-2 minutes
- FTP upload: 1-3 minutes
- Total: 2-5 minutes

**If longer:**
- Check network connectivity
- Large files might take longer
- Check Hostinger server status

## 🔍 Step 7: Debug Workflow

### Enable Debug Logging

Add this to workflow file (temporarily):

```yaml
- name: Debug FTP Connection
  run: |
    echo "FTP_SERVER: ${{ secrets.FTP_SERVER }}"
    echo "FTP_USERNAME: ${{ secrets.FTP_USERNAME }}"
    echo "FTP_PASSWORD: [HIDDEN]"
```

**Note:** Don't commit this! Remove after debugging.

### Test FTP Connection

Add a test step before deployment:

```yaml
- name: Test FTP Connection
  run: |
    apt-get update && apt-get install -y ftp
    echo "open ${{ secrets.FTP_SERVER }}" > /tmp/ftp_commands.txt
    echo "${{ secrets.FTP_USERNAME }}" >> /tmp/ftp_commands.txt
    echo "${{ secrets.FTP_PASSWORD }}" >> /tmp/ftp_commands.txt
    echo "ls" >> /tmp/ftp_commands.txt
    echo "quit" >> /tmp/ftp_commands.txt
    ftp -n < /tmp/ftp_commands.txt
```

## 📋 Quick Diagnostic Checklist

Run through this checklist:

- [ ] Workflow appears in Actions tab
- [ ] Workflow shows as "running" or "completed"
- [ ] All workflow steps show green checkmarks
- [ ] No red X marks in workflow steps
- [ ] Build step completed successfully
- [ ] Deploy step completed successfully
- [ ] GitHub Secrets are set correctly
- [ ] FTP credentials work when tested manually
- [ ] Files exist in `frontend/dist/` locally
- [ ] Files exist in `public_html/` on server
- [ ] `.htaccess` file is in `public_html/`
- [ ] Website loads at your domain
- [ ] All routes work (/, /register, /board, /contact)

## 🆘 Still Having Issues?

### Get More Help

1. **Check Workflow Logs:**
   - Copy error messages
   - Note which step failed

2. **Check Hostinger:**
   - Verify FTP is enabled
   - Check server status
   - Review error logs

3. **Contact Support:**
   - GitHub Actions: Check GitHub status page
   - Hostinger: Contact Hostinger support
   - Include error messages and logs

### Useful Links

- GitHub Actions Status: https://www.githubstatus.com/
- Hostinger Support: https://www.hostinger.com/contact
- Workflow File: `.github/workflows/deploy-hostinger.yml`
- Documentation: `GITHUB_ACTIONS_SETUP.md`

## 🔧 Manual Deployment (Fallback)

If automated deployment continues to fail:

1. **Build locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload manually:**
   - Use FTP client (FileZilla, WinSCP)
   - Upload all contents of `frontend/dist/` to `public_html/`
   - Ensure `.htaccess` is included

3. **Verify:**
   - Check website loads
   - Test all routes

---

**Remember:** Most deployment issues are related to FTP credentials or permissions. Double-check those first!

