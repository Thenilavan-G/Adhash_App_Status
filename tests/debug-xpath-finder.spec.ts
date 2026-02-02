import { test } from '@playwright/test';
import { PlayStorePage } from '../pages/PlayStorePage';

/**
 * Debug Test to Find Correct XPaths
 * This test helps identify the correct selectors for search results
 */

test.describe('XPath Finder - Debug Tool', () => {
  test('Find correct XPaths for search results', async ({ page }) => {
    const playStorePage = new PlayStorePage(page);
    
    // Navigate to Play Store
    await playStorePage.navigateToPlayStore();
    await playStorePage.clickSearchIcon();
    
    // Test with one app to find the correct structure
    const testKeyword = 'autochecker';
    console.log(`\n🔍 Searching for: ${testKeyword}`);
    
    await playStorePage.searchApp(testKeyword);
    
    // Wait for results to load
    await page.waitForTimeout(3000);
    
    // Try to find all links in the search results
    console.log('\n📋 Finding all links in search results...\n');
    
    // Method 1: Find all links with href containing 'details?id='
    const appLinks = await page.locator('a[href*="details?id="]').all();
    console.log(`Found ${appLinks.length} app links`);
    
    for (let i = 0; i < Math.min(appLinks.length, 5); i++) {
      const href = await appLinks[i].getAttribute('href');
      const text = await appLinks[i].textContent();
      console.log(`\n${i + 1}. Link:`);
      console.log(`   Href: ${href}`);
      console.log(`   Text: ${text?.trim().substring(0, 50)}...`);
    }
    
    // Method 2: Try common selectors
    console.log('\n\n🔍 Testing common selectors:\n');
    
    const selectors = [
      'a[href*="autochecker"]',
      '[role="listitem"] a',
      'section a[href*="details"]',
      'c-wiz a[href*="details"]',
      '[data-uitype] a',
    ];
    
    for (const selector of selectors) {
      try {
        const elements = await page.locator(selector).all();
        if (elements.length > 0) {
          const href = await elements[0].getAttribute('href');
          console.log(`✓ Selector: ${selector}`);
          console.log(`  Found ${elements.length} elements`);
          console.log(`  First href: ${href}\n`);
        }
      } catch (error) {
        console.log(`✗ Selector: ${selector} - No elements found\n`);
      }
    }
    
    // Take a screenshot for manual inspection
    await page.screenshot({ 
      path: 'test-results/search-results-debug.png',
      fullPage: true 
    });
    console.log('\n📸 Screenshot saved to: test-results/search-results-debug.png');
    
    // Print page HTML structure (first 2000 chars)
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('\n📄 Page HTML structure (first 2000 chars):');
    console.log(bodyHTML.substring(0, 2000));
  });
});

