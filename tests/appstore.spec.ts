import { test, expect } from '@playwright/test';
import { AppStorePage } from '../pages/AppStorePage';
import { TestResultManager, AppTestResult } from '../utils/TestResult';
import { CustomHtmlReporter } from '../utils/CustomHtmlReporter';
import { APPSTORE_TEST_DATA } from '../config/appStoreTestData';
import * as path from 'path';

/**
 * Apple App Store App Verification Test Suite
 * Verifies availability of multiple apps on Apple App Store
 */

test.describe('Apple App Store App Verification', () => {
  let appStorePage: AppStorePage;
  let resultManager: TestResultManager;

  test.beforeAll(async () => {
    resultManager = new TestResultManager();
  });

  test.beforeEach(async ({ page }) => {
    // Initialize Page Object
    appStorePage = new AppStorePage(page);
    
    // Navigate to Apple App Store
    await appStorePage.navigateToAppStore();
  });

  test('Verify all apps availability on App Store', async ({ page }) => {
    // Increase test timeout for multiple searches
    test.setTimeout(180000); // 3 minutes
    // Click search icon once at the beginning
    await appStorePage.clickSearchIcon();

    // Iterate through each app in test data
    for (let i = 0; i < APPSTORE_TEST_DATA.length; i++) {
      const appData = APPSTORE_TEST_DATA[i];
      const isFirstSearch = (i === 0);
      console.log(`\n🔍 Testing app: ${appData.appName} (${appData.keyword})`);

      let testResult: AppTestResult;

      try {
        // Search for the app
        await appStorePage.searchApp(appData.keyword, isFirstSearch);
        
        // Extract app ID from expected href
        const appIdMatch = appData.expectedHref.match(/id(\d+)/);
        const appId = appIdMatch ? appIdMatch[1] : undefined;
        
        // Get the href from search result
        const actualHref = await appStorePage.getResultHref(appData.resultXpath, appId);
        
        // Verify the href matches expected value
        const isMatch = appStorePage.verifyAppHref(actualHref, appData.expectedHref);
        
        // Create test result
        testResult = {
          appName: appData.appName,
          keyword: appData.keyword,
          expectedHref: appData.expectedHref,
          actualHref: actualHref,
          status: isMatch ? 'PASS' : 'FAIL',
          timestamp: new Date().toISOString()
        };

        if (!isMatch) {
          testResult.errorMessage = `Expected href '${appData.expectedHref}' but got '${actualHref}'`;
        }

        // Log result
        console.log(`   ✓ Expected: ${appData.expectedHref}`);
        console.log(`   ✓ Actual: ${actualHref}`);
        console.log(`   ✓ Status: ${testResult.status}`);
        
        // Add result to manager
        resultManager.addResult(testResult);
        
        // Soft assertion - continue even if this app fails
        expect.soft(isMatch, `App ${appData.appName} should be available with correct href`).toBeTruthy();
        
      } catch (error) {
        // Handle any errors during test execution
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        testResult = {
          appName: appData.appName,
          keyword: appData.keyword,
          expectedHref: appData.expectedHref,
          actualHref: null,
          status: 'FAIL',
          timestamp: new Date().toISOString(),
          errorMessage: errorMessage
        };
        
        console.log(`   ✗ Error: ${errorMessage}`);
        console.log(`   ✗ Status: FAIL`);
        
        resultManager.addResult(testResult);
        
        // Soft assertion - continue even if error occurs
        expect.soft(false, `App ${appData.appName} test failed: ${errorMessage}`).toBeTruthy();
      }
      
      // Small delay between searches
      await page.waitForTimeout(1000);
    }

    // Print final results summary
    resultManager.printResults();
    
    // Get summary
    const summary = resultManager.getSummary();
    
    // Generate Custom HTML Report
    const reportPath = path.join(process.cwd(), 'custom-reports', 'AppStore_App_Verification_Report.html');
    CustomHtmlReporter.generateReport(resultManager.getAllResults(), reportPath);
    console.log(`\n🌐 Open the report in browser: file:///${reportPath.replace(/\\/g, '/')}`);
    
    // Attach results to test report
    await test.info().attach('Test Results Summary', {
      body: JSON.stringify(resultManager.getAllResults(), null, 2),
      contentType: 'application/json'
    });

    // Final assertion - fail test if any app verification failed
    expect(summary.failed, `${summary.failed} app(s) failed verification`).toBe(0);
  });

  test.afterAll(async () => {
    console.log('\n✅ Test execution completed');
  });
});

