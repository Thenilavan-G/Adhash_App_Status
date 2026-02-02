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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var logosToDownload = [
    {
        appName: 'Algomax',
        platform: 'playstore',
        url: 'https://play.google.com/store/apps/details?id=com.algomax',
        filename: 'algomax_playstore.png'
    },
    {
        appName: 'Auto eVantage',
        platform: 'playstore',
        url: 'https://play.google.com/store/apps/details?id=com.autoevantage',
        filename: 'auto_evantage_playstore.png'
    },
    {
        appName: 'Auto eVantage',
        platform: 'appstore',
        url: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
        filename: 'auto_evantage_appstore.png'
    },
    {
        appName: 'Spark me',
        platform: 'playstore',
        url: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
        filename: 'spark_me_playstore.png'
    },
    {
        appName: 'Spark me',
        platform: 'appstore',
        url: 'https://apps.apple.com/us/app/spark-me/id1578660405',
        filename: 'spark_me_appstore.png'
    }
];
function downloadLogo(url, platform, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, logoElement, selectors, _i, selectors_1, selector, element, e_1, selectors, _a, selectors_2, selector, element, e_2, logoDir, logoPath, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, playwright_1.chromium.launch({
                        headless: false,
                        channel: 'chrome',
                        timeout: 120000 // 2 minutes to launch
                    })];
                case 1:
                    browser = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 25, , 27]);
                    return [4 /*yield*/, browser.newContext({
                            viewport: { width: 1920, height: 1080 }
                        })];
                case 3:
                    context = _b.sent();
                    return [4 /*yield*/, context.newPage()];
                case 4:
                    page = _b.sent();
                    // Set longer timeouts
                    page.setDefaultTimeout(120000); // 2 minutes
                    page.setDefaultNavigationTimeout(120000); // 2 minutes
                    console.log("\n\uD83D\uDCE5 Downloading logo for ".concat(filename, "..."));
                    console.log("   URL: ".concat(url));
                    // Navigate to the app page
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 })];
                case 5:
                    // Navigate to the app page
                    _b.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle', { timeout: 120000 })];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 7:
                    _b.sent(); // Extra wait for images to load
                    logoElement = null;
                    if (!(platform === 'playstore')) return [3 /*break*/, 14];
                    selectors = [
                        'img[alt*="icon" i]',
                        'img[itemprop="image"]',
                        'img.T75of',
                        'div[class*="icon"] img',
                        'header img',
                        'img[src*="googleusercontent"]'
                    ];
                    _i = 0, selectors_1 = selectors;
                    _b.label = 8;
                case 8:
                    if (!(_i < selectors_1.length)) return [3 /*break*/, 13];
                    selector = selectors_1[_i];
                    _b.label = 9;
                case 9:
                    _b.trys.push([9, 11, , 12]);
                    element = page.locator(selector).first();
                    return [4 /*yield*/, element.waitFor({ state: 'visible', timeout: 30000 })];
                case 10:
                    _b.sent();
                    logoElement = element;
                    console.log("   \u2713 Found logo using selector: ".concat(selector));
                    return [3 /*break*/, 13];
                case 11:
                    e_1 = _b.sent();
                    return [3 /*break*/, 12];
                case 12:
                    _i++;
                    return [3 /*break*/, 8];
                case 13: return [3 /*break*/, 20];
                case 14:
                    selectors = [
                        'picture.product-hero__artwork img',
                        'picture img[class*="artwork"]',
                        'div[class*="artwork"] img',
                        'header img',
                        'img[src*="is1-ssl.mzstatic.com"]'
                    ];
                    _a = 0, selectors_2 = selectors;
                    _b.label = 15;
                case 15:
                    if (!(_a < selectors_2.length)) return [3 /*break*/, 20];
                    selector = selectors_2[_a];
                    _b.label = 16;
                case 16:
                    _b.trys.push([16, 18, , 19]);
                    element = page.locator(selector).first();
                    return [4 /*yield*/, element.waitFor({ state: 'visible', timeout: 30000 })];
                case 17:
                    _b.sent();
                    logoElement = element;
                    console.log("   \u2713 Found logo using selector: ".concat(selector));
                    return [3 /*break*/, 20];
                case 18:
                    e_2 = _b.sent();
                    return [3 /*break*/, 19];
                case 19:
                    _a++;
                    return [3 /*break*/, 15];
                case 20:
                    if (!!logoElement) return [3 /*break*/, 22];
                    console.log("   \u2717 Could not find logo element");
                    return [4 /*yield*/, browser.close()];
                case 21:
                    _b.sent();
                    return [2 /*return*/, false];
                case 22:
                    logoDir = path.join(__dirname, 'test-results', 'logos');
                    if (!fs.existsSync(logoDir)) {
                        fs.mkdirSync(logoDir, { recursive: true });
                    }
                    logoPath = path.join(logoDir, filename);
                    return [4 /*yield*/, logoElement.screenshot({ path: logoPath, timeout: 60000 })];
                case 23:
                    _b.sent();
                    console.log("   \u2705 Logo saved: ".concat(logoPath));
                    return [4 /*yield*/, browser.close()];
                case 24:
                    _b.sent();
                    return [2 /*return*/, true];
                case 25:
                    error_1 = _b.sent();
                    console.log("   \u2717 Error: ".concat(error_1));
                    return [4 /*yield*/, browser.close()];
                case 26:
                    _b.sent();
                    return [2 /*return*/, false];
                case 27: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var successCount, failCount, _i, logosToDownload_1, logo, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 Starting logo download process...\n');
                    console.log('='.repeat(80));
                    successCount = 0;
                    failCount = 0;
                    _i = 0, logosToDownload_1 = logosToDownload;
                    _a.label = 1;
                case 1:
                    if (!(_i < logosToDownload_1.length)) return [3 /*break*/, 5];
                    logo = logosToDownload_1[_i];
                    return [4 /*yield*/, downloadLogo(logo.url, logo.platform, logo.filename)];
                case 2:
                    success = _a.sent();
                    if (success) {
                        successCount++;
                    }
                    else {
                        failCount++;
                    }
                    // Wait between downloads
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 3:
                    // Wait between downloads
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    console.log('\n' + '='.repeat(80));
                    console.log("\n\u2705 Download complete!");
                    console.log("   Success: ".concat(successCount));
                    console.log("   Failed: ".concat(failCount));
                    console.log("   Total: ".concat(logosToDownload.length));
                    return [2 /*return*/];
            }
        });
    });
}
main();
