/**
 * Test Result Utility
 * Tracks and manages test results for reporting
 */

export interface AppTestResult {
  appName: string;
  keyword: string;
  expectedHref: string;
  actualHref: string | null;
  status: 'PASS' | 'FAIL';
  timestamp: string;
  errorMessage?: string;
  platform?: 'Play Store' | 'App Store';
  logoPath?: string | null;
  logoBase64?: string | null;
  directUrlVerified?: boolean;
  logoSimilarity?: number | null;
}

export class TestResultManager {
  private results: AppTestResult[] = [];

  /**
   * Add a test result
   */
  addResult(result: AppTestResult): void {
    this.results.push(result);
  }

  /**
   * Get all test results
   */
  getAllResults(): AppTestResult[] {
    return this.results;
  }

  /**
   * Get summary of test results
   */
  getSummary(): { total: number; passed: number; failed: number; passRate: string } {
    const total = this.results.length;
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00';

    return { total, passed, failed, passRate };
  }

  /**
   * Print results to console
   */
  printResults(): void {
    console.log('\n' + '='.repeat(80));
    console.log('TEST RESULTS SUMMARY');
    console.log('='.repeat(80));
    
    this.results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.appName}`);
      console.log(`   Keyword: ${result.keyword}`);
      console.log(`   Expected: ${result.expectedHref}`);
      console.log(`   Actual: ${result.actualHref || 'NOT FOUND'}`);
      console.log(`   Status: ${result.status}`);
      if (result.errorMessage) {
        console.log(`   Error: ${result.errorMessage}`);
      }
    });

    const summary = this.getSummary();
    console.log('\n' + '='.repeat(80));
    console.log(`Total Tests: ${summary.total}`);
    console.log(`Passed: ${summary.passed}`);
    console.log(`Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
    console.log('='.repeat(80) + '\n');
  }

  /**
   * Clear all results
   */
  clearResults(): void {
    this.results = [];
  }
}

