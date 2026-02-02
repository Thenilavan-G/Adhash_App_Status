import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Simple script to download missing logos and fetch Spark Me app name
 */
async function downloadMissingData() {
  console.log('\n🚀 Starting to fetch missing data...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    timeout: 60000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const logosDir = path.join(__dirname, 'test-results', 'logos');
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  // ========== 1. FETCH SPARK ME APP NAME FROM APP STORE ==========
  console.log('📱 Fetching Spark Me app name from App Store...');
  let sparkMeAppName = 'Spark Me'; // Default
  
  try {
    await page.goto('https://apps.apple.com/us/app/spark-me/id1578660405', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });
    
    // Try multiple selectors for app name
    const selectors = [
      'h1.product-header__title',
      'h1[class*="product-header"]',
      'header h1',
      'h1.app-header__title',
      'h1'
    ];
    
    for (const selector of selectors) {
      try {
        const nameElement = page.locator(selector).first();
        await nameElement.waitFor({ state: 'visible', timeout: 5000 });
        const appName = await nameElement.textContent();
        if (appName && appName.trim().length > 0) {
          sparkMeAppName = appName.trim();
          console.log(`   ✅ Found Spark Me app name: "${sparkMeAppName}"`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
  } catch (error) {
    console.log(`   ⚠️  Could not fetch Spark Me app name: ${error}`);
  }

  // ========== 2. DOWNLOAD LOGOS ==========
  const appsToDownload = [
    {
      name: 'WavedIn',
      platform: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=com.waivedin',
      filename: 'wavedin_playstore.png',
      selectors: [
        'img[alt*="Icon"]',
        'img[itemprop="image"]',
        'img.T75of',
        'div[class*="icon"] img',
        'img[src*="googleusercontent"]'
      ]
    },
    {
      name: 'WavedIn',
      platform: 'App Store',
      url: 'https://apps.apple.com/in/app/wavedin/id6451483729',
      filename: 'wavedin_appstore.png',
      selectors: [
        'picture.product-hero__artwork img',
        'img.we-artwork__image',
        'picture img[src*="mzstatic"]',
        'div.product-hero img',
        'img[alt*="icon" i]'
      ]
    },
    {
      name: 'Algomax',
      platform: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=com.algomax',
      filename: 'algomax_playstore.png',
      selectors: [
        'img[alt*="Icon"]',
        'img[itemprop="image"]',
        'img.T75of',
        'div[class*="icon"] img',
        'img[src*="googleusercontent"]'
      ]
    },
    {
      name: 'Algomax',
      platform: 'App Store',
      url: 'https://apps.apple.com/in/app/algomax/id6498886667',
      filename: 'algomax_appstore.png',
      selectors: [
        'picture.product-hero__artwork img',
        'img.we-artwork__image',
        'picture img[src*="mzstatic"]',
        'div.product-hero img',
        'img[alt*="icon" i]'
      ]
    },
    {
      name: 'Auto eVantage',
      platform: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=com.autoevantage',
      filename: 'auto_evantage_playstore.png',
      selectors: [
        'img[alt*="Icon"]',
        'img[itemprop="image"]',
        'img.T75of',
        'div[class*="icon"] img',
        'img[src*="googleusercontent"]'
      ]
    },
    {
      name: 'Auto eVantage',
      platform: 'App Store',
      url: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
      filename: 'auto_evantage_appstore.png',
      selectors: [
        'picture.product-hero__artwork img',
        'img.we-artwork__image',
        'picture img[src*="mzstatic"]',
        'div.product-hero img',
        'img[alt*="icon" i]'
      ]
    },
    {
      name: 'Spark Me',
      platform: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
      filename: 'spark_me_playstore.png',
      selectors: [
        'img[alt*="Icon"]',
        'img[itemprop="image"]',
        'img.T75of',
        'div[class*="icon"] img',
        'img[src*="googleusercontent"]'
      ]
    }
  ];

  console.log('\n📥 Downloading logos...\n');

  for (const app of appsToDownload) {
    console.log(`📱 ${app.name} (${app.platform})...`);

    try {
      await page.goto(app.url, {
        waitUntil: 'networkidle',
        timeout: 60000
      });

      let logoDownloaded = false;

      for (const selector of app.selectors) {
        try {
          const logoElement = page.locator(selector).first();
          await logoElement.waitFor({ state: 'visible', timeout: 10000 });

          const screenshot = await logoElement.screenshot({ timeout: 30000 });
          const logoPath = path.join(logosDir, app.filename);
          fs.writeFileSync(logoPath, screenshot);

          console.log(`   ✅ Downloaded: ${app.filename}`);
          logoDownloaded = true;
          break;
        } catch (e) {
          continue;
        }
      }

      if (!logoDownloaded) {
        console.log(`   ⚠️  Could not download logo`);
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }

    await page.waitForTimeout(1000);
  }

  await browser.close();

  console.log('\n✅ Done!\n');
  console.log(`Spark Me app name: "${sparkMeAppName}"`);
  console.log('\nNext steps:');
  console.log('1. Update generate-report.ts with the Spark Me app name');
  console.log('2. Run: npx tsc generate-report.ts --esModuleInterop --resolveJsonModule && node generate-report.js');
}

downloadMissingData().catch(console.error);

