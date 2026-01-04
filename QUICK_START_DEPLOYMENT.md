# Quick Start: FTP Deployment to Hostinger

This is a quick guide to get your automated deployment working with FTP.

## Step 1: Get Your FTP Credentials from Hostinger

1. Log into [Hostinger Control Panel](https://hpanel.hostinger.com)
2. Go to **Files** → **FTP Accounts**
3. If you don't have an FTP account, create one:
   - Click **Create FTP Account**
   - Username: Choose a username
   - Password: Set a secure password
   - Directory: `/public_html`
4. **Copy these three pieces of information:**
   - **FTP Server/Host** (e.g., `ftp.yourdomain.com` or an IP address)
   - **FTP Username**
   - **FTP Password**

## Step 2: Add GitHub Secrets

1. Go to your repository: `https://github.com/organiccertified/exatec-online`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these three secrets:

   **Secret 1:**
   - Name: `FTP_SERVER`
   - Value: Your FTP server address (e.g., `ftp.yourdomain.com`)

   **Secret 2:**
   - Name: `FTP_USERNAME`
   - Value: Your FTP username

   **Secret 3:**
   - Name: `FTP_PASSWORD`
   - Value: Your FTP password

## Step 3: Test the Deployment

1. Make a small change to any file (or just add a comment)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to the **Actions** tab in GitHub
4. You should see "Deploy to Hostinger" workflow running
5. Wait 2-5 minutes for it to complete
6. Check your website - it should be updated!

## How It Works

Every time you push to the `main` branch:
1. ✅ GitHub Actions automatically starts
2. ✅ Builds your frontend (`npm run build`)
3. ✅ Deploys `frontend/dist/` to Hostinger's `public_html/`
4. ✅ Your website is live!

## Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Click **Deploy to Hostinger** workflow
3. Click **Run workflow**
4. Select `main` branch
5. Click **Run workflow**

## Troubleshooting

**Workflow fails?**
- Check the workflow logs in the **Actions** tab
- Verify your FTP credentials are correct
- Make sure FTP is enabled on your Hostinger account

**Files not updating?**
- Check that the workflow completed successfully
- Verify `.htaccess` file is in `public_html/`
- Clear your browser cache

**Need help?**
- See `GITHUB_ACTIONS_SETUP.md` for detailed troubleshooting
- Check Hostinger FTP documentation
- Review workflow logs for specific errors

## That's It! 🎉

Your automated deployment is now set up. Just push to `main` and your site will deploy automatically!

