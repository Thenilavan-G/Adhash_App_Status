import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Google Play Store App Verification
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for - increased for logo downloads */
  timeout: 300 * 1000, // 5 minutes (optimized)
  
  /* Run tests in files in parallel */
  fullyParallel: false,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : 1,
  
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'https://play.google.com',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
    
    /* Maximum time each action can take - increased for logo downloads */
    actionTimeout: 30000, // 30 seconds (optimized)

    /* Navigation timeout - increased for slower connections */
    navigationTimeout: 30000, // 30 seconds (optimized)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        // Use system Chrome if Playwright browsers are not installed
        channel: 'chrome',
      },
    },
  ],
});

