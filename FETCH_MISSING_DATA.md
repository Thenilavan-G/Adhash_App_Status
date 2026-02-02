# Fetch Missing App Names and Logos

## Current Status

### ✅ Already Have:
- **AutoChecker** (Play Store): Logo ✅
- **WavedIn** (App Store): Name ✅, Logo ✅
- **Algomax** (Play Store): Logo ✅
- **Algomax** (App Store): Name ✅, Logo ✅
- **Auto eVantage** (App Store): Name ✅, Logo ✅

### ❌ Missing:
1. **WavedIn** (Play Store): Logo (currently using App Store logo)
2. **Auto eVantage** (Play Store): Logo
3. **Spark Me** (Play Store): Logo
4. **Spark Me** (App Store): Name, Logo

## How to Fetch Missing Data

### Option 1: Run the Full Unified Test (Recommended)

This will automatically fetch all app names and logos:

```bash
npx playwright test unified.spec.ts
```

The test will:
- Fetch "Spark Me" app name from App Store
- Download all missing logos from both stores
- Generate the report with complete data

### Option 2: Manual Logo Download

If the test keeps getting interrupted, you can manually download logos:

1. **Spark Me App Store Logo**:
   - Visit: https://apps.apple.com/us/app/spark-me/id1578660405
   - Right-click the app icon → Save image
   - Save as: `test-results/logos/spark_me_appstore.png`

2. **Spark Me Play Store Logo**:
   - Visit: https://play.google.com/store/apps/details?id=com.adhash.sparkme
   - Right-click the app icon → Save image
   - Save as: `test-results/logos/spark_me_playstore.png`

3. **Auto eVantage Play Store Logo**:
   - Visit: https://play.google.com/store/apps/details?id=com.autoevantage
   - Right-click the app icon → Save image
   - Save as: `test-results/logos/auto_evantage_playstore.png`

4. **WavedIn Play Store Logo**:
   - Visit: https://play.google.com/store/apps/details?id=com.waivedin
   - Right-click the app icon → Save image
   - Save as: `test-results/logos/wavedin_playstore.png`

After downloading, update `generate-report.ts` with the logo paths and run:

```bash
npx tsc generate-report.ts --esModuleInterop --resolveJsonModule && node generate-report.js
```

## Spark Me App Name

The actual app name from App Store needs to be fetched. The test will do this automatically, or you can:

1. Visit: https://apps.apple.com/us/app/spark-me/id1578660405
2. Check the app name displayed on the page
3. Update `generate-report.ts` lines 102 and 112 with the actual name

## Expected Logo File Names

```
test-results/logos/
├── autochecker_playstore.png ✅
├── wavedin_playstore.png ❌ (need to download)
├── wavedin_appstore.png ✅
├── algomax_playstore.png ✅
├── algomax_appstore.png ✅
├── auto_evantage_playstore.png ❌ (need to download)
├── auto_evantage_appstore.png ✅
├── spark_me_playstore.png ❌ (need to download)
└── spark_me_appstore.png ❌ (need to download)
```

