# GitHub Actions Setup for Hostinger Deployment

This guide will help you set up automated deployment to Hostinger using GitHub Actions.

## Prerequisites

- GitHub repository: `https://github.com/organiccertified/exatec-online`
- Hostinger hosting account
- FTP or SSH access to Hostinger

## Step-by-Step Setup

### Step 1: Choose Deployment Method

**FTP (Recommended for beginners):**
- Easier to set up
- Works with all Hostinger plans
- Less secure (credentials in GitHub Secrets)

**SFTP (Recommended for security):**
- More secure (SSH key-based)
- Requires SSH access on Hostinger
- Better for production environments

### Step 2: Get Hostinger Credentials

#### For FTP Deployment:

1. Log into [Hostinger Control Panel](https://hpanel.hostinger.com)
2. Navigate to **Files** → **FTP Accounts**
3. If you don't have an FTP account, create one:
   - Click **Create FTP Account**
   - Set username and password
   - Directory: `/public_html`
4. Note down:
   - **FTP Server/Host** (e.g., `ftp.yourdomain.com` or IP address)
   - **FTP Username**
   - **FTP Password**

#### For SFTP Deployment:

1. Log into Hostinger Control Panel
2. Navigate to **Advanced** → **SSH Access**
3. Enable SSH access if not already enabled
4. Generate or use existing SSH key pair
5. Note down:
   - **SSH Host** (e.g., `ssh.yourdomain.com` or IP)
   - **SSH Username**
   - **SSH Port** (usually `22`)
   - **Private Key** (save this securely)

### Step 3: Configure GitHub Secrets

1. Go to your GitHub repository: `https://github.com/organiccertified/exatec-online`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

#### For FTP Deployment, add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `FTP_SERVER` | Your FTP server address | `ftp.yourdomain.com` or IP address |
| `FTP_USERNAME` | Your FTP username | `username@yourdomain.com` |
| `FTP_PASSWORD` | Your FTP password | `your-secure-password` |

#### For SFTP Deployment, add these secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `HOSTINGER_SSH_PRIVATE_KEY` | Your private SSH key (full key) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `HOSTINGER_SSH_HOST` | Your SSH host | `ssh.yourdomain.com` |
| `HOSTINGER_SSH_USER` | Your SSH username | `u123456789` |
| `HOSTINGER_SSH_PORT` | SSH port (optional) | `22` |

**Important for SSH Key:**
- Copy the **entire** private key including:
  - `-----BEGIN OPENSSH PRIVATE KEY-----`
  - All the key content
  - `-----END OPENSSH PRIVATE KEY-----`
- Never commit the private key to the repository!

### Step 4: Choose and Enable Workflow

The repository includes two workflow files:

1. **`.github/workflows/deploy-hostinger.yml`** - FTP deployment
2. **`.github/workflows/deploy-hostinger-sftp.yml`** - SFTP deployment

**To use FTP deployment:**
- Keep `deploy-hostinger.yml` as is
- Delete or rename `deploy-hostinger-sftp.yml` (optional)

**To use SFTP deployment:**
- Keep `deploy-hostinger-sftp.yml` as is
- Delete or rename `deploy-hostinger.yml` (optional)

### Step 5: Test the Deployment

1. **Automatic deployment:**
   - Make a small change to any file
   - Commit and push to `main` branch:
     ```bash
     git add .
     git commit -m "Test deployment"
     git push origin main
     ```
   - Go to **Actions** tab in GitHub
   - Watch the workflow run

2. **Manual deployment:**
   - Go to **Actions** tab
   - Select **Deploy to Hostinger** workflow
   - Click **Run workflow**
   - Select branch (usually `main`)
   - Click **Run workflow**

### Step 6: Verify Deployment

1. Wait for the workflow to complete (usually 2-5 minutes)
2. Check the workflow logs for any errors
3. Visit your website to verify it's updated
4. Check that `.htaccess` file is present in `public_html/`

## Troubleshooting

### Workflow Fails with FTP Error

**Error: "Connection timeout" or "Connection refused"**
- Verify FTP server address is correct
- Check if FTP is enabled on Hostinger
- Try using IP address instead of domain name
- Verify port (usually 21 for FTP)

**Error: "Authentication failed"**
- Double-check username and password
- Ensure no extra spaces in secrets
- Try resetting FTP password in Hostinger

### Workflow Fails with SFTP Error

**Error: "Permission denied (publickey)"**
- Verify private key is complete (includes BEGIN/END lines)
- Check that public key is added to Hostinger
- Ensure SSH access is enabled on Hostinger

**Error: "Connection timeout"**
- Verify SSH host is correct
- Check SSH port (usually 22)
- Ensure SSH is enabled on your Hostinger plan

### Files Not Deploying

- Check workflow logs for specific errors
- Verify `frontend/dist/` exists after build
- Ensure `.htaccess` is in `frontend/public/`
- Check file permissions on Hostinger

### Build Fails

- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs for specific errors
- Test build locally: `cd frontend && npm run build`

## Workflow Configuration

### Automatic Triggers

The workflow runs automatically on:
- Push to `main` branch
- Manual trigger from Actions tab

### What Gets Deployed

- All files from `frontend/dist/` directory
- `.htaccess` file (from `frontend/public/`)
- `robots.txt` and `sitemap.xml` (from `frontend/public/`)

### What Gets Excluded

- `node_modules/`
- `.git/` files
- Source files (`src/`)
- Development files

## Security Best Practices

1. **Never commit secrets:**
   - Always use GitHub Secrets
   - Don't hardcode credentials in workflow files

2. **Use SFTP when possible:**
   - More secure than FTP
   - Key-based authentication

3. **Rotate credentials regularly:**
   - Change FTP passwords periodically
   - Regenerate SSH keys if compromised

4. **Limit access:**
   - Only give deployment access to trusted team members
   - Use branch protection rules

## Monitoring Deployments

- Check **Actions** tab for deployment history
- Set up email notifications for workflow failures
- Monitor deployment times and success rates

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Hostinger FTP Guide](https://www.hostinger.com/tutorials/how-to-use-ftp)
- [Hostinger SSH Guide](https://www.hostinger.com/tutorials/how-to-use-ssh)

## Support

If you encounter issues:
1. Check workflow logs in GitHub Actions
2. Review Hostinger documentation
3. Contact Hostinger support for hosting-specific issues
4. Check GitHub Actions status page for service issues

