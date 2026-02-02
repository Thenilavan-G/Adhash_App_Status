import { Page, Locator } from '@playwright/test';
import { APPSTORE_SELECTORS } from '../config/appStoreTestData';

/**
 * Page Object Model for Apple App Store
 * Contains all methods to interact with App Store pages
 */
export class AppStorePage {
  readonly page: Page;
  readonly searchClick: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchClick = page.locator(`xpath=${APPSTORE_SELECTORS.searchClick}`);
    this.searchInput = page.locator(`xpath=${APPSTORE_SELECTORS.searchInput}`);
  }

  /**
   * Navigate to Apple App Store
   */
  async navigateToAppStore(): Promise<void> {
    await this.page.goto('https://www.apple.com/in/app-store/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on the search icon to open search field
   */
  async clickSearchIcon(): Promise<void> {
    try {
      await this.searchClick.waitFor({ state: 'visible', timeout: 10000 });
      await this.searchClick.click();
      await this.page.waitForTimeout(1000); // Wait for search field to appear
    } catch (error) {
      console.log(`   ⚠ Search icon XPath not found, trying alternative selector...`);
      // Try alternative selector
      const altSearchButton = this.page.locator('a[aria-label*="Search"]').first();
      await altSearchButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  /**
   * Search for an app by keyword
   * @param keyword - The search term to enter
   * @param isFirstSearch - Whether this is the first search (default: false)
   */
  async searchApp(keyword: string, isFirstSearch: boolean = false): Promise<void> {
    // If not first search, navigate back to App Store home and click search again
    if (!isFirstSearch) {
      await this.navigateToAppStore();
      await this.clickSearchIcon();
    }

    // Wait a bit for the search field to be ready
    await this.page.waitForTimeout(2000);

    // Try multiple selectors for the search input
    let searchInputLocator = null;

    // Try XPath first
    try {
      const xpathInput = this.page.locator(`xpath=${APPSTORE_SELECTORS.searchInput}`);
      await xpathInput.waitFor({ state: 'visible', timeout: 5000 });
      searchInputLocator = xpathInput;
    } catch (error) {
      console.log(`   ⚠ XPath search input not found, trying alternatives...`);
    }

    // Try alternative selectors if XPath failed
    if (!searchInputLocator) {
      try {
        const altInput = this.page.locator('input[type="search"]').first();
        await altInput.waitFor({ state: 'visible', timeout: 5000 });
        searchInputLocator = altInput;
        console.log(`   ✓ Found search input using alternative selector`);
      } catch (error) {
        // Try another alternative
        try {
          const altInput2 = this.page.locator('input[placeholder*="Search"]').first();
          await altInput2.waitFor({ state: 'visible', timeout: 5000 });
          searchInputLocator = altInput2;
          console.log(`   ✓ Found search input using placeholder selector`);
        } catch (error2) {
          throw new Error('Could not find search input field with any selector');
        }
      }
    }

    // Clear and fill the search field
    await searchInputLocator.clear();
    await searchInputLocator.fill(keyword);

    // Press Enter to search
    await searchInputLocator.press('Enter');

    // Wait for search results to load
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000); // Additional wait for results to render
  }

  /**
   * Get the href attribute from the search result
   * @param xpath - XPath of the result element
   * @param expectedAppId - Expected app ID to search for
   * @returns The href value or null if not found
   */
  async getResultHref(xpath: string, expectedAppId?: string): Promise<string | null> {
    // Wait a bit for results to fully load
    await this.page.waitForTimeout(2000);

    try {
      // First try the provided XPath
      const resultElement = this.page.locator(`xpath=${xpath}`);
      await resultElement.waitFor({ state: 'visible', timeout: 10000 });
      const href = await resultElement.getAttribute('href');
      console.log(`   ✓ Found using XPath`);
      return href;
    } catch (error) {
      console.log(`   ⚠ XPath not found, trying alternative selectors...`);

      // If XPath fails, try to find by app ID
      if (expectedAppId) {
        try {
          const appIdSelector = `a[href*="${expectedAppId}"]`;
          const appElement = this.page.locator(appIdSelector).first();
          await appElement.waitFor({ state: 'visible', timeout: 10000 });
          const href = await appElement.getAttribute('href');
          console.log(`   ✓ Found using app ID selector`);
          return href;
        } catch (appIdError) {
          console.log(`   ⚠ App ID selector also failed, trying more alternatives...`);
        }
      }

      // Try to get the first search result link with h2 > a structure
      try {
        const firstResult = this.page.locator('h2 a[href*="apps.apple.com"]').first();
        await firstResult.waitFor({ state: 'visible', timeout: 10000 });
        const href = await firstResult.getAttribute('href');
        console.log(`   ✓ Found using h2 > a selector`);
        return href;
      } catch (fallbackError) {
        // Last resort - any app store link
        try {
          const anyResult = this.page.locator('a[href*="apps.apple.com/"]').first();
          await anyResult.waitFor({ state: 'visible', timeout: 10000 });
          const href = await anyResult.getAttribute('href');
          console.log(`   ⚠ Using first available app store link`);
          return href;
        } catch (lastError) {
          console.error(`   ✗ All selector methods failed`);
          return null;
        }
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

    // Normalize URLs for comparison (remove trailing slashes, query params)
    const normalizeUrl = (url: string) => {
      return url.split('?')[0].replace(/\/$/, '').toLowerCase();
    };

    const normalizedActual = normalizeUrl(actualHref);
    const normalizedExpected = normalizeUrl(expectedHref);

    return normalizedActual === normalizedExpected || normalizedActual.includes(normalizedExpected);
  }

  /**
   * Get the app name from the App Store page
   * @returns The app name or null if not found
   */
  async getAppName(): Promise<string | null> {
    try {
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

