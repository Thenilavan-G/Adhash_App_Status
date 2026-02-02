# Email Notification Setup Guide

## 📧 Overview

The workflow now sends email notifications with the HTML report attached after each test run.

## ✅ What Was Added

- **Email notification step** in GitHub Actions workflow
- **HTML email body** with report summary
- **Attached HTML report** - Full report sent as attachment
- **Scheduled delivery** - Sent daily at 3:00 PM IST after tests complete

## 🔧 Setup Instructions

### Step 1: Create Gmail App Password (Recommended)

If using Gmail, you need to create an App Password:

1. **Enable 2-Factor Authentication** on your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Create App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter name: "Adhash App Status Bot"
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these three secrets:

#### Secret 1: EMAIL_USERNAME
- **Name**: `EMAIL_USERNAME`
- **Value**: Your Gmail address (e.g., `your.email@gmail.com`)

#### Secret 2: EMAIL_PASSWORD
- **Name**: `EMAIL_PASSWORD`
- **Value**: The 16-character App Password from Step 1

#### Secret 3: EMAIL_TO
- **Name**: `EMAIL_TO`
- **Value**: Recipient email(s)
  - Single recipient: `recipient@example.com`
  - Multiple recipients: `recipient1@example.com,recipient2@example.com,recipient3@example.com`

### Step 3: Verify Secrets

After adding secrets, you should see:
- ✅ `EMAIL_USERNAME`
- ✅ `EMAIL_PASSWORD`
- ✅ `EMAIL_TO`

## 📧 Email Features

### Email Content:
- ✅ **Subject**: "📊 Adhash App Status Report - [Run Number]"
- ✅ **From**: "Adhash App Status Bot"
- ✅ **HTML Body**: Beautiful formatted email with:
  - Report summary
  - Date and workflow information
  - List of verified apps
  - Link to GitHub Actions run
- ✅ **Attachment**: Full HTML report with light red theme

### Email Preview:

```
Subject: 📊 Adhash App Status Report - 123

From: Adhash App Status Bot

┌─────────────────────────────────────┐
│  📊 Adhash Application Status Report │
│  Daily Verification Report #123      │
└─────────────────────────────────────┘

Report Summary
--------------
Date: 2026-02-02
Repository: YOUR_USERNAME/Adhash_App_Status
Workflow Run: #123

📱 Apps Verified:
• AutoChecker (Play Store)
• WavedIn (Play Store & App Store)
• Algomax (Play Store & App Store)
• Auto eVantage (Play Store & App Store)
• Spark me (Play Store & App Store)

[View Workflow Run Button]

Note: The detailed HTML report is attached to this email.

Attachment: Unified_App_Verification_Report.html
```

## 🔄 Alternative Email Providers

### Using Outlook/Office 365:

Update the workflow file:
```yaml
server_address: smtp.office365.com
server_port: 587
```

### Using Custom SMTP Server:

Update the workflow file:
```yaml
server_address: smtp.your-domain.com
server_port: 587  # or 465 for SSL
secure: true
```

## 🧪 Testing Email Notifications

### Option 1: Manual Trigger
1. Go to **Actions** tab
2. Click **"Daily App Status Check"**
3. Click **"Run workflow"**
4. Wait for completion
5. Check your email inbox

### Option 2: Wait for Scheduled Run
- Workflow runs daily at 3:00 PM IST
- Email will be sent automatically after completion

## 🔍 Troubleshooting

### Email not received?

1. **Check GitHub Actions logs**:
   - Go to Actions → Click on workflow run
   - Check "Send email with HTML report" step
   - Look for error messages

2. **Common issues**:
   - ❌ Wrong App Password → Regenerate and update secret
   - ❌ 2FA not enabled → Enable 2-Step Verification
   - ❌ Email in spam → Check spam folder, mark as "Not Spam"
   - ❌ Wrong email address → Verify `EMAIL_TO` secret

3. **Verify secrets are set**:
   - Settings → Secrets and variables → Actions
   - All three secrets should be listed

### Gmail blocking sign-in?

If you see "Less secure app" error:
- ✅ Use App Password (recommended)
- ❌ Don't use "Allow less secure apps" (deprecated)

## 📊 Email Schedule

| Event | Time | Email Sent |
|-------|------|------------|
| Daily scheduled run | 3:00 PM IST | ✅ Yes |
| Manual trigger | Any time | ✅ Yes |
| Workflow failure | Any time | ✅ Yes (with error info) |

## 🎨 Customizing Email

### Change Email Subject:

Edit `.github/workflows/daily-app-status-check.yml`:
```yaml
subject: 'Your Custom Subject - ${{ github.run_number }}'
```

### Change Sender Name:

```yaml
from: Your Custom Name
```

### Add CC/BCC:

```yaml
cc: cc@example.com
bcc: bcc@example.com
```

## ✅ Verification Checklist

- [ ] Gmail App Password created
- [ ] `EMAIL_USERNAME` secret added
- [ ] `EMAIL_PASSWORD` secret added
- [ ] `EMAIL_TO` secret added
- [ ] Workflow file updated and pushed
- [ ] Test email sent successfully
- [ ] HTML report received as attachment

## 🎉 You're All Set!

Once configured, you'll receive:
- ✅ Daily email at 3:00 PM IST
- ✅ Beautiful HTML email body
- ✅ Full report attached
- ✅ Links to GitHub Actions run

The email will be sent automatically after each workflow run!

