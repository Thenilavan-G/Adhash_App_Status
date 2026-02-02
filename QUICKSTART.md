# 🚀 Quick Start Guide

## Step 1: Install Dependencies

Run the setup script (PowerShell):
```powershell
.\setup.ps1
```

Or manually:
```bash
npm install
npx playwright install chromium
```

## Step 2: Run Your First Test

### Option A: Headless Mode (Recommended for CI/CD)
```bash
npm test
```

### Option B: Headed Mode (See the browser in action)
```bash
npm run test:headed
```

### Option C: Debug Mode (Step through tests)
```bash
npm run test:debug
```

### Option D: UI Mode (Interactive test runner)
```bash
npm run test:ui
```

## Step 3: View Results

After test execution, view the beautiful HTML report:
```bash
npm run test:report
```

This will open an interactive HTML report in your browser with:
- ✅ Test execution timeline
- 📊 Pass/Fail statistics
- 📸 Screenshots (on failure)
- 🎥 Video recordings (on failure)
- 📝 Detailed logs and traces

## 📋 What the Test Does

The automation script will:

1. ✅ Launch Chromium browser
2. ✅ Navigate to Google Play Store
3. ✅ Click the search icon
4. ✅ Search for each app:
   - AutoChecker
   - WavedIn
   - AlgoMax
   - Auto Evantage
   - Spark Me
5. ✅ Verify each app's href matches expected package ID
6. ✅ Report PASS/FAIL status for each app
7. ✅ Generate comprehensive HTML report

## 🎯 Expected Output

Console output will show:
```
🔍 Testing app: AutoChecker (autochecker)
   ✓ Expected: /store/apps/details?id=com.autochecker
   ✓ Actual: /store/apps/details?id=com.autochecker
   ✓ Status: PASS

🔍 Testing app: WavedIn (wavedin)
   ✓ Expected: /store/apps/details?id=com.waivedin
   ✓ Actual: /store/apps/details?id=com.waivedin
   ✓ Status: PASS

...

TEST RESULTS SUMMARY
================================================================================
Total Tests: 5
Passed: 5
Failed: 0
Pass Rate: 100.00%
================================================================================
```

## 🔧 Customization

### Add More Apps
Edit `config/testData.ts` and add new app entries:

```typescript
{
  appName: 'My New App',
  keyword: 'my app keyword',
  expectedHref: '/store/apps/details?id=com.myapp',
  resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
}
```

### Modify Test Behavior
Edit `tests/playstore.spec.ts` to customize test logic.

### Change Browser Settings
Edit `playwright.config.ts` to modify:
- Browser type (Chrome, Firefox, Safari)
- Viewport size
- Timeout values
- Screenshot/video settings

## 🐛 Troubleshooting

### Issue: Tests are timing out
**Solution**: Increase timeout in `playwright.config.ts`:
```typescript
timeout: 120 * 1000, // 2 minutes
```

### Issue: Element not found
**Solution**: XPaths may have changed. Update them in `config/testData.ts`

### Issue: Browser doesn't launch
**Solution**: Reinstall browsers:
```bash
npx playwright install --force
```

## 📚 Learn More

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 💡 Tips

1. **Use UI Mode** for development - it's interactive and shows live test execution
2. **Use Headed Mode** to see what's happening in the browser
3. **Use Headless Mode** for CI/CD pipelines
4. **Check HTML Report** for detailed insights after test runs

---

Happy Testing! 🎉

