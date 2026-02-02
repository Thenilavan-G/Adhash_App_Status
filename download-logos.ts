import { chromium } from '@playwright/test';
import { LogoComparison } from './utils/LogoComparison';
import * as path from 'path';

/**
 * Simple script to download logos for all apps
 */
async function downloadLogos() {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome'
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();

  const apps = [
    {
      name: 'AutoChecker',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.autochecker',
      appStoreUrl: null // Skip App Store for AutoChecker
    },
    {
      name: 'WavedIn',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.waivedin',
      appStoreUrl: 'https://apps.apple.com/in/app/wavedin/id6451483729'
    },
    {
      name: 'AlgoMax',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.algomax',
      appStoreUrl: 'https://apps.apple.com/in/app/algomax/id6498886667'
    },
    {
      name: 'Auto Evantage',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.autoevantage',
      appStoreUrl: 'https://apps.apple.com/in/app/auto-evantage/id6747385992'
    },
    {
      name: 'Spark Me',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
      appStoreUrl: 'https://apps.apple.com/us/app/spark-me/id1578660405'
    }
  ];

  console.log('🚀 Starting logo download process...\n');

  for (const app of apps) {
    console.log(`\n📱 Processing: ${app.name}`);
    console.log('─'.repeat(80));

    // Download Play Store logo
    if (app.playStoreUrl) {
      try {
        console.log(`🤖 Navigating to Play Store...`);
        await page.goto(app.playStoreUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(2000);
        
        const logoPath = await LogoComparison.downloadLogo(page, 'playstore', app.name);
        if (logoPath) {
          console.log(`   ✅ Play Store logo downloaded successfully`);
        } else {
          console.log(`   ⚠️  Play Store logo download failed`);
        }
      } catch (error) {
        console.log(`   ❌ Error downloading Play Store logo: ${error}`);
      }
    }

    // Download App Store logo
    if (app.appStoreUrl) {
      try {
        console.log(`🍎 Navigating to App Store...`);
        await page.goto(app.appStoreUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(2000);
        
        const logoPath = await LogoComparison.downloadLogo(page, 'appstore', app.name);
        if (logoPath) {
          console.log(`   ✅ App Store logo downloaded successfully`);
        } else {
          console.log(`   ⚠️  App Store logo download failed`);
        }
      } catch (error) {
        console.log(`   ❌ Error downloading App Store logo: ${error}`);
      }
    }

    await page.waitForTimeout(1000);
  }

  console.log('\n\n✅ Logo download process completed!');
  console.log('─'.repeat(80));

  await browser.close();
}

downloadLogos().catch(console.error);

