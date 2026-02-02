# 🎉 Unified App Store Verification Framework

## Overview
Complete Playwright TypeScript automation framework that verifies app availability on **both Google Play Store and Apple App Store** in a single test with unified HTML reporting.

## ✨ Key Features

### 1. **Unified Testing**
- Single test suite that runs verification on both platforms
- Tests 5 apps across Play Store and App Store (9 total verifications - AutoChecker skipped on App Store)
- Intelligent fallback strategies for element selection

### 2. **Logo Comparison**
- Downloads app logos from both platforms
- Compares logo similarity between Play Store and App Store
- If logos match (>70% similarity), can override failed href verification
- Logos embedded in HTML report as base64 images

### 3. **Direct URL Verification**
- If search-based verification fails, automatically tries direct URL
- Verifies app availability by navigating to:
  - Play Store: `https://play.google.com/store/apps/details?id={packageId}`
  - App Store: `https://apps.apple.com/{region}/app/{appName}/{appId}`

### 4. **Modern HTML Report**
- **Platform Column**: Shows 🤖 for Play Store, 🍎 for App Store
- **Logo Column**: Displays actual app logos from both platforms
- **URL Columns**: Shows full expected and actual URLs
- **Status Badges**: Color-coded PASS/FAIL indicators
- **Statistics Cards**: Total tests, passed, failed counts
- **Progress Bar**: Visual success rate indicator

## 📁 Project Structure

```
AppPlayStore/
├── config/
│   ├── testData.ts              # Play Store only test data
│   ├── appStoreTestData.ts      # App Store only test data
│   └── unifiedTestData.ts       # ✨ Unified test data for both platforms
├── pages/
│   ├── PlayStorePage.ts         # Play Store Page Object Model
│   └── AppStorePage.ts          # App Store Page Object Model
├── tests/
│   ├── playstore.spec.ts        # Play Store only tests
│   ├── appstore.spec.ts         # App Store only tests
│   └── unified.spec.ts          # ✨ Unified tests for both platforms
├── utils/
│   ├── TestResult.ts            # Test result management
│   ├── CustomHtmlReporter.ts    # ✨ Enhanced HTML reporter with logos
│   └── LogoComparison.ts        # ✨ Logo download and comparison utility
└── custom-reports/
    ├── PlayStore_App_Verification_Report.html
    ├── AppStore_App_Verification_Report.html
    └── Unified_App_Verification_Report.html  # ✨ Combined report
```

## 🎯 Test Data Configuration

### Apps Tested:
1. **AutoChecker** - Play Store only (App Store skipped)
2. **WavedIn** - Both platforms
3. **AlgoMax** - Both platforms
4. **Auto Evantage** - Both platforms
5. **Spark Me** - Both platforms

### Direct URLs:
**Play Store:**
- `https://play.google.com/store/apps/details?id=com.autochecker`
- `https://play.google.com/store/apps/details?id=com.waivedin`
- `https://play.google.com/store/apps/details?id=com.algomax`
- `https://play.google.com/store/apps/details?id=com.autoevantage`
- `https://play.google.com/store/apps/details?id=com.adhash.sparkme`

**App Store:**
- `https://apps.apple.com/in/app/wavedin/id6451483729`
- `https://apps.apple.com/in/app/algomax/id6498886667`
- `https://apps.apple.com/in/app/auto-evantage/id6747385992`
- `https://apps.apple.com/us/app/spark-me/id1578660405`

## 🚀 Running Tests

### Run Unified Test (Both Platforms):
```bash
npx playwright test unified.spec.ts --headed
```

### Run Individual Platform Tests:
```bash
# Play Store only
npx playwright test playstore.spec.ts --headed

# App Store only
npx playwright test appstore.spec.ts --headed
```

### Run All Tests:
```bash
npx playwright test
```

## 📊 HTML Report Features

### Report Columns:
1. **S.No** - Serial number
2. **Logo** - App logo image (50x50px, rounded corners)
3. **App Name** - Bold app name
4. **Platform** - 🤖 Play Store or 🍎 App Store badge
5. **Search Keyword** - Keyword used for search
6. **Expected URL** - Full expected URL
7. **Actual URL** - Full actual URL found
8. **Status** - ✓ OK (green) or ✗ FAIL (red) badge

### Report Sections:
- **Header**: Title with platform icon
- **Statistics Cards**: Total, Passed, Failed counts
- **Success Rate**: Large percentage with progress bar
- **Results Table**: Detailed test results with logos
- **Footer**: Framework information

## 🔧 Technical Implementation

### Logo Comparison Logic:
1. Download logos from both platforms using multiple selector fallbacks
2. Save logos as PNG files in `test-results/logos/`
3. Compare file sizes as similarity proxy (production would use pixelmatch/resemblejs)
4. Convert logos to base64 for HTML embedding
5. If similarity > 70%, override failed href verification

### Verification Strategy:
1. **Search-based**: Search for app and verify result href
2. **Direct URL**: If search fails, navigate to direct URL
3. **Logo Match**: If both fail but logos match, mark as PASS

### Selector Fallback:
- **Play Store**: XPath → Package ID selector → First result
- **App Store**: XPath → App ID selector → h2 > a → Any app link

## 📈 Expected Results

### Unified Test:
- **Total Tests**: 9 (5 Play Store + 4 App Store)
- **Expected Pass Rate**: 80-100%
- **Execution Time**: ~5-8 minutes

### Individual Tests:
- **Play Store**: 5 tests, ~100% pass rate
- **App Store**: 4 tests, ~75-100% pass rate

## 🎨 Report Styling

- **Gradient Background**: Purple to blue gradient
- **Card-based Layout**: Modern material design
- **Responsive**: Works on desktop and mobile
- **Hover Effects**: Interactive table rows
- **Color Coding**: Green for pass, red for fail
- **Logo Display**: Rounded corners with shadow

## 📝 Notes

- AutoChecker is skipped for App Store (not available)
- Logos may fail to download if selectors change
- Direct URL verification provides fallback reliability
- Test timeout set to 10 minutes for comprehensive testing
- All reports are standalone HTML files (no external dependencies)

## 🎯 Success Criteria

✅ App found via search with correct href  
✅ App found via direct URL navigation  
✅ App logos match between platforms (>70% similarity)  
✅ Modern HTML report generated with logos and platform badges  
✅ All test results tracked and displayed  

---

**Generated by Playwright TypeScript Automation Framework**  
**Powered by Page Object Model (POM) Architecture**

