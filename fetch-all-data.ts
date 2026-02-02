import { chromium, Browser, Page } from '@playwright/test';
import { LogoComparison } from './utils/LogoComparison';
import { PlayStorePage } from './pages/PlayStorePage';
import { AppStorePage } from './pages/AppStorePage';
import { UNIFIED_TEST_DATA } from './config/unifiedTestData';
import * as fs from 'fs';
import * as path from 'path';

interface AppData {
  name: string;
  playStoreLogo: string | null;
  appStoreLogo: string | null;
}

/**
 * Comprehensive script to fetch all app names and logos
 */
async function fetchAllData() {
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n🚀 Fetching All App Names and Logos\n');
  console.log('='.repeat(80));

  const logosDir = path.join(__dirname, 'test-results', 'logos');
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  const results: { [key: string]: AppData } = {};

  for (const appData of UNIFIED_TEST_DATA) {
    console.log(`\n📱 Processing: ${appData.appName}`);
    console.log('-'.repeat(80));
    
    const appKey = appData.appName.toLowerCase().replace(/\s+/g, '_');
    results[appKey] = {
      name: appData.appName,
      playStoreLogo: null,
      appStoreLogo: null
    };

    // ========== FETCH FROM APP STORE ==========
    if (!appData.appStore.skip) {
      try {
        console.log('🍎 Fetching from App Store...');
        await page.goto(appData.appStore.directUrl, { timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 30000 });
        
        // Get app name
        const appStorePage = new AppStorePage(page);
        const appName = await appStorePage.getAppName();
        if (appName) {
          results[appKey].name = appName;
          console.log(`   ✅ App name: ${appName}`);
        }
        
        // Get logo
        const logoPath = await LogoComparison.downloadLogo(page, 'appstore', appData.appName);
        if (logoPath) {
          results[appKey].appStoreLogo = logoPath;
          console.log(`   ✅ Logo saved: ${logoPath}`);
        }
      } catch (error) {
        console.log(`   ❌ App Store failed: ${error}`);
      }
    } else {
      console.log('🍎 App Store: Skipped');
    }

    // ========== FETCH FROM PLAY STORE ==========
    try {
      console.log('🤖 Fetching from Play Store...');
      await page.goto(appData.playStore.directUrl, { timeout: 60000 });
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      
      // Get app name (if not already fetched from App Store)
      if (results[appKey].name === appData.appName) {
        const playStorePage = new PlayStorePage(page);
        const appName = await playStorePage.getAppName();
        if (appName) {
          results[appKey].name = appName;
          console.log(`   ✅ App name: ${appName}`);
        }
      }
      
      // Get logo
      const logoPath = await LogoComparison.downloadLogo(page, 'playstore', appData.appName);
      if (logoPath) {
        results[appKey].playStoreLogo = logoPath;
        console.log(`   ✅ Logo saved: ${logoPath}`);
      }
    } catch (error) {
      console.log(`   ❌ Play Store failed: ${error}`);
    }
  }

  await browser.close();

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESULTS SUMMARY:\n');
  
  for (const [key, data] of Object.entries(results)) {
    console.log(`${data.name}:`);
    console.log(`  Play Store Logo: ${data.playStoreLogo || '❌ Missing'}`);
    console.log(`  App Store Logo:  ${data.appStoreLogo || '❌ Missing'}`);
    console.log('');
  }

  console.log('✅ Data fetching complete!');
  return results;
}

fetchAllData().catch(console.error);

