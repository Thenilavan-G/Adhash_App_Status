import { chromium } from '@playwright/test';
import { LogoComparison } from './utils/LogoComparison';
import { UNIFIED_TEST_DATA } from './config/unifiedTestData';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to fetch app logos from stores and save them
 */
async function fetchLogos() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🎨 Fetching App Logos from Stores\n');
  console.log('='.repeat(80));

  // Ensure logos directory exists
  const logosDir = path.join(__dirname, 'test-results', 'logos');
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  const logoResults: { [key: string]: { playstore: string | null, appstore: string | null } } = {};

  for (const appData of UNIFIED_TEST_DATA) {
    console.log(`\n📱 App: ${appData.appName}`);
    const appKey = appData.appName.toLowerCase().replace(/\s+/g, '_');
    logoResults[appKey] = { playstore: null, appstore: null };

    // Fetch from Play Store
    try {
      console.log('   🤖 Fetching logo from Play Store...');
      await page.goto(appData.playStore.directUrl, { timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      const logoPath = await LogoComparison.downloadLogo(page, 'playstore', appData.appName);
      if (logoPath) {
        logoResults[appKey].playstore = logoPath;
        console.log(`   ✅ Play Store logo saved: ${logoPath}`);
      } else {
        console.log(`   ⚠️ Play Store logo not found`);
      }
    } catch (error) {
      console.log(`   ❌ Play Store logo failed: ${error}`);
    }

    // Fetch from App Store (if not skipped)
    if (!appData.appStore.skip) {
      try {
        console.log('   🍎 Fetching logo from App Store...');
        await page.goto(appData.appStore.directUrl, { timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        
        const logoPath = await LogoComparison.downloadLogo(page, 'appstore', appData.appName);
        if (logoPath) {
          logoResults[appKey].appstore = logoPath;
          console.log(`   ✅ App Store logo saved: ${logoPath}`);
        } else {
          console.log(`   ⚠️ App Store logo not found`);
        }
      } catch (error) {
        console.log(`   ❌ App Store logo failed: ${error}`);
      }
    } else {
      console.log('   ⏭️  Skipping App Store logo');
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Logo Fetch Results:');
  console.log(JSON.stringify(logoResults, null, 2));
  console.log('\n✅ Logo fetching complete!');

  return logoResults;
}

fetchLogos().catch(console.error);

