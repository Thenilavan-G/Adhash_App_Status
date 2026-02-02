# Git Setup and Push Instructions

## ✅ What Has Been Done

1. ✅ **Git repository initialized**
2. ✅ **All files committed** with message: "Initial commit: Adhash App Status automation with light red theme report and daily 3PM IST schedule"
3. ✅ **GitHub Actions workflow created** at `.github/workflows/daily-app-status-check.yml`
4. ✅ **Scheduled to run daily at 3:00 PM IST** (9:30 AM UTC)

## 📋 Next Steps - Complete These Manually

### Step 1: Update Remote Repository URL

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Remove the placeholder remote
git remote remove origin

# Add your actual GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/Adhash_App_Status.git
```

Or if you're using SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/Adhash_App_Status.git
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Adhash_App_Status`
3. Description: "Automated app availability verification for Play Store and App Store"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Set the default branch name
git branch -M master

# Push to GitHub
git push -u origin master
```

### Step 4: Enable GitHub Pages (for Report Hosting)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select: **gh-pages** branch
4. Click **Save**

### Step 5: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 6: Test the Workflow

**Option A: Wait for Scheduled Run**
- The workflow will automatically run every day at 3:00 PM IST

**Option B: Manual Trigger**
1. Go to **Actions** tab
2. Click **"Daily App Status Check"** workflow
3. Click **"Run workflow"** button
4. Select branch: **master**
5. Click **"Run workflow"**

## 📊 Workflow Features

### Schedule
- **Runs daily at 3:00 PM IST** (9:30 AM UTC)
- Cron expression: `30 9 * * *`

### What It Does
1. ✅ Checks out the code
2. ✅ Installs Node.js and dependencies
3. ✅ Installs Playwright browsers
4. ✅ Runs unified app verification tests
5. ✅ Generates HTML report with light red theme
6. ✅ Uploads test results as artifacts
7. ✅ Deploys report to GitHub Pages
8. ✅ Creates summary with report link

### Viewing Reports

After the workflow runs:

1. **Artifacts**: Go to Actions → Click on workflow run → Download artifacts
2. **GitHub Pages**: Reports will be available at:
   ```
   https://YOUR_USERNAME.github.io/Adhash_App_Status/reports/RUN_NUMBER/Unified_App_Verification_Report.html
   ```

## 🎨 Report Features

- ✅ **Light red theme** - Beautiful gradient background
- ✅ **All app logos** - Embedded in the report
- ✅ **App names** - Fetched from stores
- ✅ **Pass/Fail status** - For each app
- ✅ **User-friendly fonts** - Segoe UI, Open Sans

## 🔧 Troubleshooting

### If workflow fails:

1. Check the Actions tab for error logs
2. Ensure GitHub Pages is enabled
3. Verify the repository has proper permissions
4. Check if Playwright can access the store URLs

### To modify schedule:

Edit `.github/workflows/daily-app-status-check.yml`:

```yaml
schedule:
  - cron: '30 9 * * *'  # Change this line
```

**Cron format**: `minute hour day month weekday`
- Current: `30 9 * * *` = 9:30 AM UTC = 3:00 PM IST
- For 5:00 PM IST: `30 11 * * *` (11:30 AM UTC)

## 📝 Important Notes

1. **IST to UTC conversion**: IST is UTC+5:30
   - 3:00 PM IST = 9:30 AM UTC
   - 5:00 PM IST = 11:30 AM UTC

2. **GitHub Actions free tier**:
   - Public repos: Unlimited minutes
   - Private repos: 2,000 minutes/month

3. **Artifacts retention**: 30 days (configurable in workflow file)

## ✅ Verification Checklist

- [ ] GitHub repository created
- [ ] Remote URL updated
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] GitHub Actions enabled
- [ ] Workflow tested (manual trigger)
- [ ] Report accessible via GitHub Pages

## 🎉 You're All Set!

Once you complete these steps, your app status checks will run automatically every day at 3:00 PM IST!

