"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHtmlReporter = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Custom HTML Report Generator
 * Creates a beautiful, modern HTML report similar to the reference design
 */
var CustomHtmlReporter = /** @class */ (function () {
    function CustomHtmlReporter() {
    }
    /**
     * Generate a modern HTML report
     * @param results - Array of test results
     * @param outputPath - Path where the HTML report should be saved
     * @param reportTitle - Optional custom title for the report
     */
    CustomHtmlReporter.generateReport = function (results, outputPath, reportTitle) {
        var timestamp = new Date().toLocaleString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        var totalTests = results.length;
        var passedTests = results.filter(function (r) { return r.status === 'PASS'; }).length;
        var failedTests = results.filter(function (r) { return r.status === 'FAIL'; }).length;
        var successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : '0.0';
        // Determine report title based on output path or use custom title
        var title = reportTitle;
        if (!title) {
            if (outputPath.includes('AppStore')) {
                title = 'Adhash Application Available Status';
            }
            else if (outputPath.includes('PlayStore')) {
                title = 'Adhash Application Available Status';
            }
            else {
                title = 'Adhash Application Available Status';
            }
        }
        var html = this.generateHtmlContent(timestamp, totalTests, passedTests, failedTests, successRate, results, title);
        // Ensure directory exists
        var dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Write HTML file
        fs.writeFileSync(outputPath, html, 'utf-8');
        console.log("\n\uD83D\uDCCA Custom HTML Report generated: ".concat(outputPath));
    };
    /**
     * Generate the complete HTML content
     */
    CustomHtmlReporter.generateHtmlContent = function (timestamp, totalTests, passedTests, failedTests, successRate, results, reportTitle) {
        var headerIcon = reportTitle.includes('Apple') ? '🍎' : '📱';
        return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>".concat(reportTitle, "</title>\n    <link href=\"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap\" rel=\"stylesheet\">\n    <style>\n        ").concat(this.getStyles(), "\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <header>\n            <div class=\"header-icon\">").concat(headerIcon, "</div>\n            <h1>").concat(reportTitle, "</h1>\n            <p class=\"timestamp\">").concat(timestamp, "</p>\n        </header>\n\n        <div class=\"stats-container\">\n            <div class=\"stat-card blue\">\n                <div class=\"stat-number\">").concat(totalTests, "</div>\n                <div class=\"stat-label\">Total Tests</div>\n            </div>\n            <div class=\"stat-card green\">\n                <div class=\"stat-icon\">\u2713</div>\n                <div class=\"stat-number\">").concat(passedTests, "</div>\n                <div class=\"stat-label\">Passed</div>\n            </div>\n            <div class=\"stat-card red\">\n                <div class=\"stat-icon\">\u2717</div>\n                <div class=\"stat-number\">").concat(failedTests, "</div>\n                <div class=\"stat-label\">Failed</div>\n            </div>\n        </div>\n\n        <div class=\"success-rate\">\n            <div class=\"success-percentage\">").concat(successRate, "%</div>\n            <div class=\"success-label\">Success Rate</div>\n        </div>\n\n        <div class=\"progress-bar-container\">\n            <div class=\"progress-bar\" style=\"width: ").concat(successRate, "%\"></div>\n        </div>\n\n        <table class=\"results-table\">\n            <thead>\n                <tr>\n                    <th>S.No</th>\n                    <th>Logo</th>\n                    <th>App Name</th>\n                    <th>Platform</th>\n                    <th>Redirect URL</th>\n                    <th>Status</th>\n                </tr>\n            </thead>\n            <tbody>\n                ").concat(this.generateTableRows(results), "\n            </tbody>\n        </table>\n\n        <footer>\n            <p>Generated by Playwright TypeScript Automation Framework</p>\n            <p>Powered by Page Object Model (POM) Architecture</p>\n        </footer>\n    </div>\n</body>\n</html>");
    };
    /**
     * Generate table rows for test results
     */
    CustomHtmlReporter.generateTableRows = function (results) {
        // Play Store and App Store actual logos as base64
        var playStoreLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMzRBODUzIiBkPSJNMyAyMC41VjMuNWMwLS4zMS4xNS0uNjEuNDEtLjc5TDE0LjU0IDEybC0xMS4xMyA5LjI5Yy0uMjYtLjE4LS40MS0uNDgtLjQxLS43OXoiLz48cGF0aCBmaWxsPSIjRUE0MzM1IiBkPSJNMTYuNTQgMTAuMDJsLTMuNjMtMi4wNEwzLjQxIDIuNzFjLjE2LS4xLjM0LS4xNi41NC0uMTYuMzEgMCAuNjEuMTEuODYuMzJsOS42MyA1LjQzeiIvPjxwYXRoIGZpbGw9IiNGQkJDMDQiIGQ9Ik0xNi41NCAxMy45OGwtMi4xMS0xLjE4TDMuNDEgMjEuMjljLjE2LjEuMzQuMTYuNTQuMTYuMzEgMCAuNjEtLjExLjg2LS4zMmw5LjYzLTUuNDN6Ii8+PHBhdGggZmlsbD0iIzQyODVGNCIgZD0iTTIwLjQxIDEwLjk4bC0zLjg3LTIuMTdsLTIuMTEgMS4xOGwyLjExIDEuMThsMy44Ny0yLjE3Yy4yNi0uMTUuNDEtLjQzLjQxLS43M3MtLjE1LS41OC0uNDEtLjczeiIvPjwvc3ZnPg==';
        var appStoreLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDA3QUZGIiBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bS0xLTEzaDJ2Nmgtdi02em0wIDhoMnYyaC0ydi0yeiIvPjxwYXRoIGZpbGw9IiMwMDdBRkYiIGQ9Ik0xMS4yOSAxNS43MWwtLjI5LS4yOWMtLjM5LS4zOS0uMzktMS4wMiAwLTEuNDFsMS40MS0xLjQxYy4zOS0uMzkgMS4wMi0uMzkgMS40MSAwbC4yOS4yOWMuMzkuMzkuMzkgMS4wMiAwIDEuNDFsLTEuNDEgMS40MWMtLjM5LjM5LTEuMDIuMzktMS40MSAweiIvPjwvc3ZnPg==';
        return results.map(function (result, index) {
            var statusClass = result.status === 'PASS' ? 'status-pass' : 'status-fail';
            var statusText = result.status === 'PASS' ? 'PASS' : 'FAIL';
            // Platform logo - use actual Play Store and App Store logos
            var platformLogo = result.platform === 'Play Store' ? playStoreLogo : appStoreLogo;
            var platformText = result.platform || 'Unknown';
            // Logo image - if missing, use a placeholder
            var logoHtml = result.logoBase64
                ? "<img src=\"".concat(result.logoBase64, "\" alt=\"").concat(result.appName, " logo\" class=\"app-logo\" />")
                : "<div class=\"no-logo-placeholder\">\n             <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50\" height=\"50\" viewBox=\"0 0 50 50\">\n               <rect width=\"50\" height=\"50\" rx=\"12\" fill=\"#e5e7eb\"/>\n               <text x=\"25\" y=\"30\" font-family=\"Arial\" font-size=\"24\" fill=\"#9ca3af\" text-anchor=\"middle\">\uD83D\uDCF1</text>\n             </svg>\n           </div>";
            // URLs with hyperlinks
            var expectedUrl = result.expectedHref;
            var actualUrl = result.actualHref || 'NOT FOUND';
            // Create clickable links
            var expectedUrlHtml = expectedUrl.startsWith('http')
                ? "<a href=\"".concat(expectedUrl, "\" target=\"_blank\" class=\"url-link\">").concat(expectedUrl, "</a>")
                : "<code class=\"url-code\">".concat(expectedUrl, "</code>");
            var actualUrlHtml = actualUrl !== 'NOT FOUND' && (actualUrl.startsWith('http') || actualUrl.startsWith('/'))
                ? "<a href=\"".concat(actualUrl.startsWith('http') ? actualUrl : 'https://play.google.com' + actualUrl, "\" target=\"_blank\" class=\"url-link\">").concat(actualUrl, "</a>")
                : "<code class=\"url-code\">".concat(actualUrl, "</code>");
            return "\n                <tr>\n                    <td>".concat(index + 1, "</td>\n                    <td>").concat(logoHtml, "</td>\n                    <td><strong>").concat(result.appName, "</strong></td>\n                    <td><span class=\"platform-text\">").concat(platformText, "</span></td>\n                    <td>").concat(expectedUrlHtml, "</td>\n                    <td><span class=\"status-badge ").concat(statusClass, "\">").concat(statusText, "</span></td>\n                </tr>");
        }).join('');
    };
    /**
     * Get CSS styles for the report
     */
    CustomHtmlReporter.getStyles = function () {
        return "\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n\n        body {\n            font-family: 'Segoe UI', 'Open Sans', 'Helvetica Neue', Arial, sans-serif;\n            background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);\n            min-height: 100vh;\n            padding: 20px;\n        }\n\n        .container {\n            max-width: 1200px;\n            margin: 0 auto;\n            background: white;\n            border-radius: 16px;\n            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);\n            overflow: hidden;\n        }\n\n        header {\n            background: linear-gradient(135deg, #e57373 0%, #ef5350 100%);\n            color: white;\n            padding: 40px;\n            text-align: center;\n        }\n\n        .header-icon {\n            font-size: 48px;\n            margin-bottom: 10px;\n        }\n\n        header h1 {\n            font-size: 32px;\n            font-weight: 600;\n            margin-bottom: 10px;\n            letter-spacing: 0.5px;\n        }\n\n        .timestamp {\n            font-size: 15px;\n            opacity: 0.95;\n            font-weight: 400;\n        }\n\n        .stats-container {\n            display: grid;\n            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n            gap: 20px;\n            padding: 40px;\n            background: #f8f9fa;\n        }\n\n        .stat-card {\n            background: white;\n            padding: 30px;\n            border-radius: 12px;\n            text-align: center;\n            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n            transition: transform 0.3s ease;\n        }\n\n        .stat-card:hover {\n            transform: translateY(-5px);\n            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);\n        }\n\n        .stat-card.blue {\n            border-top: 4px solid #e57373;\n        }\n\n        .stat-card.green {\n            border-top: 4px solid #66bb6a;\n        }\n\n        .stat-card.red {\n            border-top: 4px solid #ef5350;\n        }\n\n        .stat-icon {\n            font-size: 24px;\n            margin-bottom: 10px;\n        }\n\n        .stat-number {\n            font-size: 48px;\n            font-weight: 700;\n            margin-bottom: 10px;\n        }\n\n        .stat-card.blue .stat-number {\n            color: #e57373;\n        }\n\n        .stat-card.green .stat-number {\n            color: #66bb6a;\n        }\n\n        .stat-card.red .stat-number {\n            color: #ef5350;\n        }\n\n        .stat-label {\n            font-size: 14px;\n            color: #5f6368;\n            text-transform: uppercase;\n            letter-spacing: 1.2px;\n            font-weight: 500;\n        }\n\n        .success-rate {\n            text-align: center;\n            padding: 30px 40px 10px;\n        }\n\n        .success-percentage {\n            font-size: 64px;\n            font-weight: 700;\n            color: #66bb6a;\n            margin-bottom: 10px;\n        }\n\n        .success-label {\n            font-size: 16px;\n            color: #5f6368;\n            text-transform: uppercase;\n            letter-spacing: 1.2px;\n            font-weight: 500;\n        }\n\n        .progress-bar-container {\n            margin: 20px 40px 40px;\n            height: 30px;\n            background: #e5e7eb;\n            border-radius: 15px;\n            overflow: hidden;\n            position: relative;\n        }\n\n        .progress-bar {\n            height: 100%;\n            background: linear-gradient(90deg, #66bb6a 0%, #43a047 100%);\n            transition: width 1s ease;\n            box-shadow: 0 2px 4px rgba(102, 187, 106, 0.4);\n            position: absolute;\n            top: 0;\n            left: 0;\n        }\n\n        .results-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin: 0 0 40px 0;\n        }\n\n        .results-table thead {\n            background: linear-gradient(135deg, #e57373 0%, #ef5350 100%);\n            color: white;\n        }\n\n        .results-table th {\n            padding: 16px;\n            text-align: left;\n            font-weight: 600;\n            text-transform: uppercase;\n            font-size: 13px;\n            letter-spacing: 1.2px;\n        }\n\n        .results-table tbody tr {\n            border-bottom: 1px solid #e5e7eb;\n            transition: background-color 0.2s ease;\n        }\n\n        .results-table tbody tr:hover {\n            background-color: #ffebee;\n        }\n\n        .results-table td {\n            padding: 16px;\n            font-size: 15px;\n            color: #37474f;\n        }\n\n        .results-table code {\n            background: #ffebee;\n            padding: 4px 8px;\n            border-radius: 4px;\n            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;\n            font-size: 13px;\n            color: #37474f;\n        }\n\n        .status-badge {\n            display: inline-block;\n            padding: 6px 16px;\n            border-radius: 20px;\n            font-weight: 600;\n            font-size: 12px;\n            text-transform: uppercase;\n            letter-spacing: 0.5px;\n        }\n\n        .status-pass {\n            background: #c8e6c9;\n            color: #2e7d32;\n        }\n\n        .status-fail {\n            background: #ffcdd2;\n            color: #c62828;\n        }\n\n        .app-logo {\n            width: 50px;\n            height: 50px;\n            border-radius: 12px;\n            object-fit: cover;\n            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n        }\n\n        .no-logo {\n            display: inline-block;\n            width: 50px;\n            height: 50px;\n            background: #e5e7eb;\n            border-radius: 12px;\n            text-align: center;\n            line-height: 50px;\n            font-size: 10px;\n            color: #9ca3af;\n        }\n\n        .no-logo-placeholder {\n            display: inline-block;\n            width: 50px;\n            height: 50px;\n        }\n\n        .platform-logo {\n            width: 24px;\n            height: 24px;\n            vertical-align: middle;\n        }\n\n        .platform-text {\n            font-weight: 600;\n            color: #4b5563;\n            font-size: 14px;\n        }\n\n        .url-link {\n            color: #e57373;\n            text-decoration: none;\n            word-break: break-all;\n            font-size: 13px;\n        }\n\n        .url-link:hover {\n            color: #d32f2f;\n            text-decoration: underline;\n        }\n\n        .platform-badge {\n            display: inline-block;\n            padding: 4px 12px;\n            border-radius: 12px;\n            background: #f3f4f6;\n            font-size: 13px;\n            font-weight: 500;\n        }\n\n        .url-code {\n            font-size: 11px;\n            max-width: 200px;\n            display: inline-block;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n\n        footer {\n            background: #f8f9fa;\n            padding: 30px;\n            text-align: center;\n            color: #6b7280;\n            font-size: 14px;\n        }\n\n        footer p {\n            margin: 5px 0;\n        }\n\n        @media (max-width: 768px) {\n            .stats-container {\n                grid-template-columns: 1fr;\n            }\n\n            header h1 {\n                font-size: 24px;\n            }\n\n            .success-percentage {\n                font-size: 48px;\n            }\n\n            .results-table {\n                font-size: 12px;\n            }\n\n            .results-table th,\n            .results-table td {\n                padding: 10px;\n            }\n        }\n    ";
    };
    return CustomHtmlReporter;
}());
exports.CustomHtmlReporter = CustomHtmlReporter;
