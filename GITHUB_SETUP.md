# GitHub Setup Guide

## ✅ Completed Steps

1. ✅ Git repository initialized
2. ✅ All files added to staging
3. ✅ Initial commit created
4. ✅ Connected to GitHub repository: [exatec-online](https://github.com/organiccertified/exatec-online)

## Repository Information

- **Repository URL**: https://github.com/organiccertified/exatec-online
- **Owner**: organiccertified
- **Repository Name**: exatec-online

## Verify Connection

```bash
git remote -v
```

This should show:
```
origin  https://github.com/organiccertified/exatec-online (fetch)
origin  https://github.com/organiccertified/exatec-online (push)
```

## Future Commits

After making changes, use these commands:

```bash
# Check what changed
git status

# Add all changes
git add .

# Or add specific files
git add path/to/file

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Branch Management

**Create a new branch:**
```bash
git checkout -b feature/your-feature-name
```

**Switch branches:**
```bash
git checkout branch-name
```

**Push a new branch:**
```bash
git push -u origin branch-name
```

## Useful Git Commands

```bash
# View commit history
git log

# View current status
git status

# View remote repositories
git remote -v

# Pull latest changes
git pull

# View differences
git diff
```

