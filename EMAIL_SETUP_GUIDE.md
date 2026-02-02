# Email Notification Setup Guide

## 📧 Overview

The workflow sends **automated email notifications** with the HTML report attached after each test run.

**Email Configuration:**
- **From:** thenilavan@adhashtech.com
- **To:** qateam@adhashtech.com
- **Attachment:** Full HTML report with light red theme

## ✅ How It Works

1. **Workflow runs** at 3:00 PM IST daily
2. **Tests execute** and generate HTML report
3. **Email sent** from `thenilavan@adhashtech.com` to `qateam@adhashtech.com`
4. **HTML report attached** with light red theme and all app logos
5. **Report also uploaded** to GitHub Actions artifacts

## 🔧 Setup Instructions

### Step 1: Add GitHub Secrets

You need to add **3 secrets** to your GitHub repository:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these three secrets:

#### Secret 1: EMAIL_FROM
- **Name:** `EMAIL_FROM`
- **Value:** `thenilavan@adhashtech.com`

#### Secret 2: EMAIL_PASSWORD
- **Name:** `EMAIL_PASSWORD`
- **Value:** `G8sYN8MRCWpM`

#### Secret 3: EMAIL_TO
- **Name:** `EMAIL_TO`
- **Value:** `qateam@adhashtech.com`

### Step 2: Verify Secrets

After adding secrets, you should see in GitHub Settings → Secrets:
- ✅ `EMAIL_FROM`
- ✅ `EMAIL_PASSWORD`
- ✅ `EMAIL_TO`

### Step 3: Done!

That's it! The workflow will now send emails automatically.

## 📧 Email Preview

The QA team will receive a professional HTML email with the report attached.

**Email Details:**
- **From:** thenilavan@adhashtech.com
- **To:** qateam@adhashtech.com
- **Subject:** 📊 Adhash App Status Report - [Run Number]
- **Attachment:** Unified_App_Verification_Report.html

## 📎 What's Included

### Email Body:
- ✅ Beautiful HTML formatted email
- ✅ Report summary with date and run number
- ✅ List of all verified apps
- ✅ Link to GitHub Actions workflow run
- ✅ Professional light red theme design

### Email Attachment:
- ✅ Full HTML report: `Unified_App_Verification_Report.html`
- ✅ Light red gradient theme
- ✅ All 9 app logos embedded
- ✅ Pass/Fail status for each app
- ✅ Redirect URLs included

## 🧪 Testing

### Test the Email Notification:

1. Go to **Actions** tab in GitHub
2. Click **"Daily App Status Check"**
3. Click **"Run workflow"**
4. Select branch: **main**
5. Click **"Run workflow"**
6. Wait 2-3 minutes
7. **Check qateam@adhashtech.com inbox!**

## 📊 Email Schedule

| Event | Time | Email Sent To |
|-------|------|---------------|
| **Daily Schedule** | 3:00 PM IST | qateam@adhashtech.com |
| **Manual Trigger** | Any time | qateam@adhashtech.com |

## 🔍 Troubleshooting

### Email not received?

1. **Check GitHub Secrets**: Verify all 3 secrets are added correctly
2. **Check Workflow Logs**: Go to Actions → Click on run → Check "Send email" step
3. **Check Spam Folder**: Email might be in spam/junk
4. **Verify Credentials**: Ensure email and password are correct

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] SECRET: `EMAIL_FROM` = `thenilavan@adhashtech.com`
- [ ] SECRET: `EMAIL_PASSWORD` = `G8sYN8MRCWpM`
- [ ] SECRET: `EMAIL_TO` = `qateam@adhashtech.com`
- [ ] Workflow run manually (test)
- [ ] Email received at qateam@adhashtech.com

## 🎉 You're All Set!

The QA team will receive daily emails at 3:00 PM IST with the full HTML report attached!
