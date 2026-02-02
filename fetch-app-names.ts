import { chromium } from '@playwright/test';
import { PlayStorePage } from './pages/PlayStorePage';
import { AppStorePage } from './pages/AppStorePage';
import { UNIFIED_TEST_DATA } from './config/unifiedTestData';

/**
 * Simple script to fetch app names from stores
 */
async function fetchAppNames() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🚀 Fetching App Names from Stores\n');
  console.log('='.repeat(80));

  const appNames: { [key: string]: string } = {};

  for (const appData of UNIFIED_TEST_DATA) {
    console.log(`\n📱 App: ${appData.appName}`);
    let fetchedName: string | null = null;

    // Try App Store first
    if (!appData.appStore.skip) {
      try {
        console.log('   📝 Fetching from App Store...');
        const appStorePage = new AppStorePage(page);
        await page.goto(appData.appStore.directUrl, { timeout: 30000 });
        await page.waitForLoadState('networkidle');
        fetchedName = await appStorePage.getAppName();
        if (fetchedName) {
          console.log(`   ✓ App Store name: ${fetchedName}`);
        }
      } catch (error) {
        console.log(`   ⚠ App Store failed: ${error}`);
      }
    }

    // Try Play Store if App Store failed
    if (!fetchedName) {
      try {
        console.log('   📝 Fetching from Play Store...');
        const playStorePage = new PlayStorePage(page);
        await page.goto(appData.playStore.directUrl, { timeout: 30000 });
        await page.waitForLoadState('networkidle');
        fetchedName = await playStorePage.getAppName();
        if (fetchedName) {
          console.log(`   ✓ Play Store name: ${fetchedName}`);
        }
      } catch (error) {
        console.log(`   ⚠ Play Store failed: ${error}`);
      }
    }

    appNames[appData.appName] = fetchedName || appData.appName;
    console.log(`   ✅ Final name: ${appNames[appData.appName]}`);
  }

  await browser.close();

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Fetched App Names:');
  console.log(JSON.stringify(appNames, null, 2));

  return appNames;
}

fetchAppNames().catch(console.error);

