"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var CustomHtmlReporter_1 = require("./utils/CustomHtmlReporter");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Convert logo file to base64
 */
function convertLogoToBase64(logoPath) {
    if (!logoPath)
        return null;
    try {
        var fullPath = path.join(__dirname, logoPath);
        if (!fs.existsSync(fullPath)) {
            console.log("\u26A0\uFE0F  Logo file not found: ".concat(fullPath));
            return null;
        }
        var imageBuffer = fs.readFileSync(fullPath);
        var base64Image = imageBuffer.toString('base64');
        var mimeType = logoPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return "data:".concat(mimeType, ";base64,").concat(base64Image);
    }
    catch (error) {
        console.log("\u274C Error converting logo to base64: ".concat(error));
        return null;
    }
}
// Sample data to generate the report
var sampleResults = [
    {
        appName: 'AutoChecker',
        keyword: 'autochecker',
        platform: 'Play Store',
        expectedHref: 'https://play.google.com/store/apps/details?id=com.autochecker',
        actualHref: 'https://play.google.com/store/apps/details?id=com.autochecker',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/autochecker_playstore.png' // ✅ REAL LOGO
    },
    {
        appName: 'WavedIn', // ✅ REAL NAME from App Store
        keyword: 'wavedin',
        platform: 'Play Store',
        expectedHref: 'https://play.google.com/store/apps/details?id=com.waivedin',
        actualHref: 'https://play.google.com/store/apps/details?id=com.waivedin',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/wavedin_playstore.png' // ✅ REAL LOGO from Play Store
    },
    {
        appName: 'WavedIn', // ✅ REAL NAME from App Store
        keyword: 'wavedin',
        platform: 'App Store',
        expectedHref: 'https://apps.apple.com/in/app/wavedin/id6451483729',
        actualHref: 'https://apps.apple.com/in/app/wavedin/id6451483729',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/wavedin_appstore.png'
    },
    {
        appName: 'Algomax', // ✅ REAL NAME from App Store (lowercase 'm')
        keyword: 'algomax',
        platform: 'Play Store',
        expectedHref: 'https://play.google.com/store/apps/details?id=com.algomax',
        actualHref: 'https://play.google.com/store/apps/details?id=com.algomax',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/algomax_playstore.png' // ✅ REAL LOGO
    },
    {
        appName: 'Algomax', // ✅ REAL NAME from App Store (lowercase 'm')
        keyword: 'algomax',
        platform: 'App Store',
        expectedHref: 'https://apps.apple.com/in/app/algomax/id6498886667',
        actualHref: 'https://apps.apple.com/in/app/algomax/id6498886667',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/algomax_appstore.png'
    },
    {
        appName: 'Auto eVantage', // ✅ REAL NAME from App Store (lowercase 'e')
        keyword: 'auto evantage',
        platform: 'Play Store',
        expectedHref: 'https://play.google.com/store/apps/details?id=com.autoevantage',
        actualHref: 'https://play.google.com/store/apps/details?id=com.autoevantage',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/auto_evantage_playstore.png' // ✅ REAL LOGO
    },
    {
        appName: 'Auto eVantage', // ✅ REAL NAME from App Store (lowercase 'e')
        keyword: 'auto evantage',
        platform: 'App Store',
        expectedHref: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
        actualHref: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/auto_evantage_appstore.png' // ✅ REAL LOGO
    },
    {
        appName: 'Spark me', // ✅ REAL NAME from App Store (lowercase 'm')
        keyword: 'spark me',
        platform: 'Play Store',
        expectedHref: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
        actualHref: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/spark_me_playstore.png' // ✅ REAL LOGO
    },
    {
        appName: 'Spark me', // ✅ REAL NAME from App Store (lowercase 'm')
        keyword: 'spark me',
        platform: 'App Store',
        expectedHref: 'https://apps.apple.com/us/app/spark-me/id1578660405',
        actualHref: 'https://apps.apple.com/us/app/spark-me/id1578660405',
        status: 'PASS',
        timestamp: new Date().toISOString(),
        logoPath: 'test-results/logos/spark_me_appstore.png' // ✅ REAL LOGO
    }
];
// Convert all logos to base64
console.log('\n🎨 Converting logos to base64...');
var resultsWithLogos = sampleResults.map(function (result) {
    if (result.logoPath) {
        var logoBase64 = convertLogoToBase64(result.logoPath);
        if (logoBase64) {
            console.log("\u2705 Converted logo for ".concat(result.appName, " (").concat(result.platform, ")"));
            return __assign(__assign({}, result), { logoBase64: logoBase64 });
        }
        else {
            console.log("\u26A0\uFE0F  Failed to convert logo for ".concat(result.appName, " (").concat(result.platform, ")"));
        }
    }
    return result;
});
// Generate the report
console.log('\n📊 Generating HTML report...');
CustomHtmlReporter_1.CustomHtmlReporter.generateReport(resultsWithLogos, 'custom-reports/Unified_App_Verification_Report.html');
console.log('✅ Report generated successfully!');
