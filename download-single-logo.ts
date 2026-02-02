import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Download a single logo - run this script multiple times for each logo
 * Usage: node download-single-logo.js <url> <platform> <filename>
 */

const args = process.argv.slice(2);
const url = args[0];
const platform = args[1] as 'playstore' | 'appstore';
const filename = args[2];

if (!url || !platform || !filename) {
  console.log('Usage: node download-single-logo.js <url> <platform> <filename>');
  console.log('Example: node download-single-logo.js "https://play.google.com/store/apps/details?id=com.algomax" playstore algomax_playstore.png');
  process.exit(1);
}

async function downloadLogo() {
  console.log(`\n🚀 Starting logo download...`);
  console.log(`   URL: ${url}`);
  console.log(`   Platform: ${platform}`);
  console.log(`   Filename: ${filename}\n`);

  const browser = await chromium.launch({ 
    headless: false,
    channel: 'chrome'
  });
  
  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });
    
    // Set longer timeouts
    page.setDefaultTimeout(90000); // 90 seconds
    
    console.log(`📄 Navigating to page...`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    console.log(`✓ Page loaded`);
    
    // Wait for images to load
    await page.waitForTimeout(5000);
    
    let logoElement = null;
    
    if (platform === 'playstore') {
      console.log(`🔍 Searching for Play Store logo...`);
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
          console.log(`   Trying: ${selector}`);
          const element = page.locator(selector).first();
          await element.waitFor({ state: 'visible', timeout: 10000 });
          logoElement = element;
          console.log(`   ✅ Found logo using: ${selector}`);
          break;
        } catch (e) {
          console.log(`   ✗ Not found`);
        }
      }
    } else {
      console.log(`🔍 Searching for App Store logo...`);
      const selectors = [
        'picture.product-hero__artwork img',
        'picture img[class*="artwork"]',
        'div[class*="artwork"] img',
        'header img',
        'img[src*="is1-ssl.mzstatic.com"]',
        'img[class*="product-hero"]'
      ];
      
      for (const selector of selectors) {
        try {
          console.log(`   Trying: ${selector}`);
          const element = page.locator(selector).first();
          await element.waitFor({ state: 'visible', timeout: 10000 });
          logoElement = element;
          console.log(`   ✅ Found logo using: ${selector}`);
          break;
        } catch (e) {
          console.log(`   ✗ Not found`);
        }
      }
    }
    
    if (!logoElement) {
      console.log(`\n❌ Could not find logo element on the page`);
      await browser.close();
      process.exit(1);
    }
    
    // Create directory if it doesn't exist
    const logoDir = path.join(__dirname, 'test-results', 'logos');
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
      console.log(`✓ Created directory: ${logoDir}`);
    }
    
    // Take screenshot of the logo
    const logoPath = path.join(logoDir, filename);
    console.log(`\n📸 Taking screenshot...`);
    await logoElement.screenshot({ path: logoPath });
    
    // Check file size
    const stats = fs.statSync(logoPath);
    console.log(`\n✅ Logo saved successfully!`);
    console.log(`   Path: ${logoPath}`);
    console.log(`   Size: ${stats.size} bytes`);
    
    await browser.close();
    
  } catch (error) {
    console.log(`\n❌ Error: ${error}`);
    await browser.close();
    process.exit(1);
  }
}

downloadLogo();

