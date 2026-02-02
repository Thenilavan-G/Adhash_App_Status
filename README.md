# Google Play Store App Verification - Playwright TypeScript Automation

This project automates the verification of app availability on Google Play Store using Playwright with TypeScript and Page Object Model (POM) design pattern.

## 📋 Project Structure

```
AppPlayStore/
├── config/
│   └── testData.ts          # Test data configuration for all apps
├── pages/
│   └── PlayStorePage.ts     # Page Object Model for Play Store
├── tests/
│   └── playstore.spec.ts    # Main test suite
├── utils/
│   └── TestResult.ts        # Test result management utility
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🎯 Test Scenarios

The automation verifies the following apps on Google Play Store:

1. **AutoChecker** - `com.autochecker`
2. **WavedIn** - `com.waivedin`
3. **AlgoMax** - `com.algomax`
4. **Auto Evantage** - `com.autoevantage`
5. **Spark Me** - `com.sparkme`

Each test:
- Searches for the app using specific keywords
- Verifies the app appears in search results
- Validates the app's href matches expected package ID
- Reports PASS/FAIL status

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## ▶️ Running Tests

### Run all tests (headless mode):
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests with UI mode:
```bash
npm run test:ui
```

### View HTML report:
```bash
npm run test:report
```

## 📊 Test Reports

After test execution, reports are generated in:
- **HTML Report**: `playwright-report/index.html` (Modern, interactive report)
- **JSON Report**: `test-results/results.json`
- **Console Output**: Detailed summary with PASS/FAIL status

The HTML report includes:
- Test execution timeline
- Screenshots on failure
- Video recordings on failure
- Detailed error messages
- Test attachments with JSON results

## 🏗️ Architecture

### Page Object Model (POM)
- **PlayStorePage.ts**: Encapsulates all Play Store page interactions
  - `navigateToPlayStore()`: Navigate to Play Store apps page
  - `clickSearchIcon()`: Open search field
  - `searchApp(keyword)`: Search for an app
  - `getResultHref(xpath)`: Get href from search result
  - `verifyAppHref()`: Verify href matches expected value

### Test Data Management
- **testData.ts**: Centralized configuration for all app test data
- Easy to add/modify apps without changing test code

### Result Management
- **TestResult.ts**: Tracks and manages test results
- Provides summary statistics
- Formats output for reporting

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- Timeout: 60 seconds per test
- Browser: Chromium (Desktop Chrome)
- Viewport: 1920x1080
- Screenshots: On failure
- Videos: On failure
- Traces: On first retry

### Adding New Apps

Edit `config/testData.ts`:

```typescript
{
  appName: 'Your App Name',
  keyword: 'search keyword',
  expectedHref: '/store/apps/details?id=com.yourapp',
  resultXpath: '/xpath/to/result/element'
}
```

## 📝 Test Results Format

```
TEST RESULTS SUMMARY
================================================================================

1. AutoChecker
   Keyword: autochecker
   Expected: /store/apps/details?id=com.autochecker
   Actual: /store/apps/details?id=com.autochecker
   Status: PASS

Total Tests: 5
Passed: 5
Failed: 0
Pass Rate: 100.00%
================================================================================
```

## 🛠️ Troubleshooting

### Tests failing due to timeout
- Increase timeout in `playwright.config.ts`
- Check internet connection
- Verify Google Play Store is accessible

### Element not found errors
- XPaths may change if Google updates their UI
- Update XPaths in `config/testData.ts`

### Browser not launching
- Run `npx playwright install` to install browsers
- Check system requirements

## 📄 License

ISC

