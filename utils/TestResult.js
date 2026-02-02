"use strict";
/**
 * Test Result Utility
 * Tracks and manages test results for reporting
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultManager = void 0;
var TestResultManager = /** @class */ (function () {
    function TestResultManager() {
        this.results = [];
    }
    /**
     * Add a test result
     */
    TestResultManager.prototype.addResult = function (result) {
        this.results.push(result);
    };
    /**
     * Get all test results
     */
    TestResultManager.prototype.getAllResults = function () {
        return this.results;
    };
    /**
     * Get summary of test results
     */
    TestResultManager.prototype.getSummary = function () {
        var total = this.results.length;
        var passed = this.results.filter(function (r) { return r.status === 'PASS'; }).length;
        var failed = this.results.filter(function (r) { return r.status === 'FAIL'; }).length;
        var passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00';
        return { total: total, passed: passed, failed: failed, passRate: passRate };
    };
    /**
     * Print results to console
     */
    TestResultManager.prototype.printResults = function () {
        console.log('\n' + '='.repeat(80));
        console.log('TEST RESULTS SUMMARY');
        console.log('='.repeat(80));
        this.results.forEach(function (result, index) {
            console.log("\n".concat(index + 1, ". ").concat(result.appName));
            console.log("   Keyword: ".concat(result.keyword));
            console.log("   Expected: ".concat(result.expectedHref));
            console.log("   Actual: ".concat(result.actualHref || 'NOT FOUND'));
            console.log("   Status: ".concat(result.status));
            if (result.errorMessage) {
                console.log("   Error: ".concat(result.errorMessage));
            }
        });
        var summary = this.getSummary();
        console.log('\n' + '='.repeat(80));
        console.log("Total Tests: ".concat(summary.total));
        console.log("Passed: ".concat(summary.passed));
        console.log("Failed: ".concat(summary.failed));
        console.log("Pass Rate: ".concat(summary.passRate, "%"));
        console.log('='.repeat(80) + '\n');
    };
    /**
     * Clear all results
     */
    TestResultManager.prototype.clearResults = function () {
        this.results = [];
    };
    return TestResultManager;
}());
exports.TestResultManager = TestResultManager;
