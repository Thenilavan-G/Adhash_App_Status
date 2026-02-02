import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility for comparing app logos between platforms
 */
export class LogoComparison {
  /**
   * Download and save app logo from a page
   * @param page - Playwright page object
   * @param platform - 'playstore' or 'appstore'
   * @param appName - Name of the app
   * @returns Path to the saved logo image or null if failed
   */
  static async downloadLogo(page: Page, platform: 'playstore' | 'appstore', appName: string): Promise<string | null> {
    try {
      let logoElement;

      if (platform === 'playstore') {
        // Play Store logo selectors - try multiple options with increased timeout
        const selectors = [
          'img[itemprop="image"]',
          'img[alt*="Cover art"]',
          'img.T75of',
          'img[class*="cover"]',
          'div[class*="icon"] img',
          'img[src*="googleusercontent"]',
          'img[src*="play-lh"]',
          'img[alt*="icon"]',
          'img[alt*="logo"]',
          'header img',
          'div[role="img"] img'
        ];

        for (const selector of selectors) {
          try {
            logoElement = page.locator(selector).first();
            await logoElement.waitFor({ state: 'visible', timeout: 10000 });
            // Verify the element has a valid src
            const src = await logoElement.getAttribute('src');
            if (src && src.length > 0) {
              console.log(`   ✓ Found logo using selector: ${selector}`);
              break;
            }
          } catch (e) {
            continue;
          }
        }
      } else {
        // App Store logo selectors - try multiple options with increased timeout
        const selectors = [
          'picture.we-artwork img',
          'img[class*="we-artwork"]',
          'picture img[src*="mzstatic"]',
          'img[src*="is1-ssl"]',
          'img[src*="is2-ssl"]',
          'img[src*="is3-ssl"]',
          'img[src*="is4-ssl"]',
          'img[src*="is5-ssl"]',
          'picture source[type="image/png"] + img',
          'div[class*="artwork"] img',
          'header img[src*="mzstatic"]'
        ];

        for (const selector of selectors) {
          try {
            logoElement = page.locator(selector).first();
            await logoElement.waitFor({ state: 'visible', timeout: 10000 });
            // Verify the element has a valid src
            const src = await logoElement.getAttribute('src');
            if (src && src.length > 0) {
              console.log(`   ✓ Found logo using selector: ${selector}`);
              break;
            }
          } catch (e) {
            continue;
          }
        }
      }

      if (!logoElement) {
        console.log(`   ⚠ Could not find logo element for ${appName} on ${platform}`);
        return null;
      }
      
      // Get the logo src
      const logoSrc = await logoElement.getAttribute('src');
      if (!logoSrc) {
        console.log(`   ⚠ Could not find logo src for ${appName} on ${platform}`);
        return null;
      }
      
      // Create logos directory if it doesn't exist
      const logosDir = path.join(process.cwd(), 'test-results', 'logos');
      if (!fs.existsSync(logosDir)) {
        fs.mkdirSync(logosDir, { recursive: true });
      }
      
      // Download the image
      const sanitizedAppName = appName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const logoPath = path.join(logosDir, `${sanitizedAppName}_${platform}.png`);

      // Take screenshot of the logo element with increased timeout
      await logoElement.screenshot({
        path: logoPath,
        timeout: 30000 // 30 seconds timeout for screenshot
      });

      console.log(`   ✓ Logo saved: ${logoPath}`);
      return logoPath;
      
    } catch (error) {
      console.log(`   ⚠ Failed to download logo for ${appName} on ${platform}: ${error}`);
      return null;
    }
  }
  
  /**
   * Compare two logo images using visual similarity
   * @param logo1Path - Path to first logo
   * @param logo2Path - Path to second logo
   * @returns Similarity score (0-100) or null if comparison failed
   */
  static async compareLogos(logo1Path: string | null, logo2Path: string | null): Promise<number | null> {
    // For now, we'll do a simple file existence check
    // In a production environment, you would use image comparison libraries like pixelmatch or resemblejs
    
    if (!logo1Path || !logo2Path) {
      return null;
    }
    
    if (!fs.existsSync(logo1Path) || !fs.existsSync(logo2Path)) {
      return null;
    }
    
    // Simple file size comparison as a basic check
    const stats1 = fs.statSync(logo1Path);
    const stats2 = fs.statSync(logo2Path);
    
    // If file sizes are very different, logos are likely different
    const sizeDiff = Math.abs(stats1.size - stats2.size);
    const avgSize = (stats1.size + stats2.size) / 2;
    const similarity = Math.max(0, 100 - (sizeDiff / avgSize * 100));
    
    console.log(`   📊 Logo similarity: ${similarity.toFixed(1)}%`);
    
    // For a more accurate comparison, you would use:
    // - pixelmatch library
    // - resemblejs
    // - OpenCV
    // But for this demo, we'll use file size as a proxy
    
    return similarity;
  }
  
  /**
   * Convert logo to base64 for embedding in HTML report
   * @param logoPath - Path to logo image
   * @returns Base64 encoded image string or null
   */
  static logoToBase64(logoPath: string | null): string | null {
    if (!logoPath || !fs.existsSync(logoPath)) {
      return null;
    }
    
    try {
      const imageBuffer = fs.readFileSync(logoPath);
      const base64Image = imageBuffer.toString('base64');
      return `data:image/png;base64,${base64Image}`;
    } catch (error) {
      console.log(`   ⚠ Failed to convert logo to base64: ${error}`);
      return null;
    }
  }
}

