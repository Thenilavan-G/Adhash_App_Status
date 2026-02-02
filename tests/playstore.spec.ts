import { test, expect } from '@playwright/test';
import { PlayStorePage } from '../pages/PlayStorePage';
import { TestResultManager, AppTestResult } from '../utils/TestResult';
import { CustomHtmlReporter } from '../utils/CustomHtmlReporter';
import { APP_TEST_DATA } from '../config/testData';
import * as path from 'path';

/**
 * Google Play Store App Verification Test Suite
 * Verifies availability of multiple apps on Google Play Store
 */

test.describe('Google Play Store App Verification', () => {
  let playStorePage: PlayStorePage;
  let resultManager: TestResultManager;

  test.beforeAll(async () => {
    resultManager = new TestResultManager();
  });

  test.beforeEach(async ({ page }) => {
    // Initialize Page Object
    playStorePage = new PlayStorePage(page);
    
    // Navigate to Google Play Store
    await playStorePage.navigateToPlayStore();
  });

  test('Verify all apps availability on Play Store', async ({ page }) => {
    // Click search icon once at the beginning
    await playStorePage.clickSearchIcon();

    // Iterate through each app in test data
    for (const appData of APP_TEST_DATA) {
      console.log(`\n🔍 Testing app: ${appData.appName} (${appData.keyword})`);
      
      let testResult: AppTestResult;
      
      try {
        // Search for the app
        await playStorePage.searchApp(appData.keyword);

        // Extract package ID from expected href
        const packageId = appData.expectedHref.split('id=')[1];

        // Get the href from search result
        const actualHref = await playStorePage.getResultHref(appData.resultXpath, packageId);

        // Verify the href matches expected value
        const isMatch = playStorePage.verifyAppHref(actualHref, appData.expectedHref);
        
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
    const reportPath = path.join(process.cwd(), 'custom-reports', 'PlayStore_App_Verification_Report.html');
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

