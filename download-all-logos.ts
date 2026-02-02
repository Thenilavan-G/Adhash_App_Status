import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Simple script to download all missing app logos
 * Uses direct URLs and increased timeouts for reliability
 */

interface LogoDownload {
  appName: string;
  platform: 'playstore' | 'appstore';
  url: string;
  filename: string;
}

const logosToDownload: LogoDownload[] = [
  {
    appName: 'Algomax',
    platform: 'playstore',
    url: 'https://play.google.com/store/apps/details?id=com.algomax',
    filename: 'algomax_playstore.png'
  },
  {
    appName: 'Auto eVantage',
    platform: 'playstore',
    url: 'https://play.google.com/store/apps/details?id=com.autoevantage',
    filename: 'auto_evantage_playstore.png'
  },
  {
    appName: 'Auto eVantage',
    platform: 'appstore',
    url: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
    filename: 'auto_evantage_appstore.png'
  },
  {
    appName: 'Spark me',
    platform: 'playstore',
    url: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
    filename: 'spark_me_playstore.png'
  },
  {
    appName: 'Spark me',
    platform: 'appstore',
    url: 'https://apps.apple.com/us/app/spark-me/id1578660405',
    filename: 'spark_me_appstore.png'
  }
];

async function downloadLogo(url: string, platform: 'playstore' | 'appstore', filename: string): Promise<boolean> {
  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome',
    timeout: 120000 // 2 minutes to launch
  });
  
  try {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Set longer timeouts
    page.setDefaultTimeout(120000); // 2 minutes
    page.setDefaultNavigationTimeout(120000); // 2 minutes
    
    console.log(`\n📥 Downloading logo for ${filename}...`);
    console.log(`   URL: ${url}`);
    
    // Navigate to the app page
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForLoadState('networkidle', { timeout: 120000 });
    await page.waitForTimeout(5000); // Extra wait for images to load
    
    let logoElement = null;
    
    if (platform === 'playstore') {
      // Try multiple selectors for Play Store logo
      const selectors = [
        'img[alt*="icon" i]',
        'img[itemprop="image"]',
        'img.T75of',
        'div[class*="icon"] img',
        'header img',
        'img[src*="googleusercontent"]'
      ];
      
      for (const selector of selectors) {
        try {
          const element = page.locator(selector).first();
          await element.waitFor({ state: 'visible', timeout: 30000 });
          logoElement = element;
          console.log(`   ✓ Found logo using selector: ${selector}`);
          break;
        } catch (e) {
          continue;
        }
      }
    } else {
      // Try multiple selectors for App Store logo
      const selectors = [
        'picture.product-hero__artwork img',
        'picture img[class*="artwork"]',
        'div[class*="artwork"] img',
        'header img',
        'img[src*="is1-ssl.mzstatic.com"]'
      ];
      
      for (const selector of selectors) {
        try {
          const element = page.locator(selector).first();
          await element.waitFor({ state: 'visible', timeout: 30000 });
          logoElement = element;
          console.log(`   ✓ Found logo using selector: ${selector}`);
          break;
        } catch (e) {
          continue;
        }
      }
    }
    
    if (!logoElement) {
      console.log(`   ✗ Could not find logo element`);
      await browser.close();
      return false;
    }
    
    // Create directory if it doesn't exist
    const logoDir = path.join(__dirname, 'test-results', 'logos');
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
    }
    
    // Take screenshot of the logo
    const logoPath = path.join(logoDir, filename);
    await logoElement.screenshot({ path: logoPath, timeout: 60000 });
    
    console.log(`   ✅ Logo saved: ${logoPath}`);
    
    await browser.close();
    return true;
    
  } catch (error) {
    console.log(`   ✗ Error: ${error}`);
    await browser.close();
    return false;
  }
}

async function main() {
  console.log('🚀 Starting logo download process...\n');
  console.log('=' .repeat(80));
  
  let successCount = 0;
  let failCount = 0;
  
  for (const logo of logosToDownload) {
    const success = await downloadLogo(logo.url, logo.platform, logo.filename);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Wait between downloads
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Download complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`   Total: ${logosToDownload.length}`);
}

main();

