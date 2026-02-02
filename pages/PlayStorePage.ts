import { Page, Locator } from '@playwright/test';
import { SELECTORS } from '../config/testData';

/**
 * Page Object Model for Google Play Store
 * Contains all methods to interact with Play Store pages
 */
export class PlayStorePage {
  readonly page: Page;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchIcon = page.locator(`xpath=${SELECTORS.searchIcon}`);
    this.searchInput = page.locator(`xpath=${SELECTORS.searchInput}`);
  }

  /**
   * Navigate to Google Play Store Apps page
   */
  async navigateToPlayStore(): Promise<void> {
    await this.page.goto('/store/apps', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on the search icon to open search field
   */
  async clickSearchIcon(): Promise<void> {
    await this.searchIcon.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchIcon.click();
    await this.page.waitForTimeout(1000); // Wait for search field to appear
  }

  /**
   * Search for an app by keyword
   * @param keyword - The search term to enter
   */
  async searchApp(keyword: string): Promise<void> {
    // Clear the search field first
    await this.searchInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchInput.clear();
    
    // Type the keyword
    await this.searchInput.fill(keyword);
    
    // Press Enter to search
    await this.searchInput.press('Enter');
    
    // Wait for search results to load
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000); // Additional wait for results to render
  }

  /**
   * Get the href attribute from the first search result
   * @param xpath - XPath of the result element
   * @param expectedPackageId - Expected package ID to search for
   * @returns The href value or null if not found
   */
  async getResultHref(xpath: string, expectedPackageId?: string): Promise<string | null> {
    try {
      // First try the provided XPath
      const resultElement = this.page.locator(`xpath=${xpath}`);
      await resultElement.waitFor({ state: 'visible', timeout: 5000 });
      const href = await resultElement.getAttribute('href');
      return href;
    } catch (error) {
      console.log(`   ⚠ XPath not found, trying alternative selectors...`);

      // If XPath fails, try to find by package ID
      if (expectedPackageId) {
        try {
          const packageSelector = `a[href*="${expectedPackageId}"]`;
          const packageElement = this.page.locator(packageSelector).first();
          await packageElement.waitFor({ state: 'visible', timeout: 5000 });
          const href = await packageElement.getAttribute('href');
          console.log(`   ✓ Found using package ID selector`);
          return href;
        } catch (pkgError) {
          console.log(`   ✗ Package ID selector also failed`);
        }
      }

      // Try to get the first search result link
      try {
        const firstResult = this.page.locator('section a[href*="details?id="]').first();
        await firstResult.waitFor({ state: 'visible', timeout: 5000 });
        const href = await firstResult.getAttribute('href');
        console.log(`   ⚠ Using first search result instead`);
        return href;
      } catch (fallbackError) {
        console.error(`   ✗ All selector methods failed`);
        return null;
      }
    }
  }

  /**
   * Verify if the app href matches the expected value
   * @param actualHref - The actual href value from the page
   * @param expectedHref - The expected href value
   * @returns true if match, false otherwise
   */
  verifyAppHref(actualHref: string | null, expectedHref: string): boolean {
    if (!actualHref) {
      return false;
    }
    return actualHref.includes(expectedHref) || actualHref === expectedHref;
  }

  /**
   * Get the app name from the Play Store page
   * @returns The app name or null if not found
   */
  async getAppName(): Promise<string | null> {
    try {
      // Try multiple selectors for app name
      const selectors = [
        'h1[itemprop="name"]',
        'h1.Fd93Bb',
        'header h1',
        'div[class*="title"] h1',
        'h1'
      ];

      for (const selector of selectors) {
        try {
          const nameElement = this.page.locator(selector).first();
          await nameElement.waitFor({ state: 'visible', timeout: 5000 });
          const appName = await nameElement.textContent();
          if (appName && appName.trim().length > 0) {
            console.log(`   ✓ Found app name: ${appName.trim()}`);
            return appName.trim();
          }
        } catch (e) {
          continue;
        }
      }

      console.log(`   ⚠ Could not find app name`);
      return null;
    } catch (error) {
      console.log(`   ⚠ Error getting app name: ${error}`);
      return null;
    }
  }

  /**
   * Navigate back to search to perform another search
   */
  async navigateBackToSearch(): Promise<void> {
    await this.clickSearchIcon();
  }
}

