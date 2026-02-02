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
var test_1 = require("@playwright/test");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Simple script to download missing logos and fetch Spark Me app name
 */
function downloadMissingData() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, logosDir, sparkMeAppName, selectors, _i, selectors_1, selector, nameElement, appName, e_1, error_1, appsToDownload, _a, appsToDownload_1, app, logoDownloaded, _b, _c, selector, logoElement, screenshot, logoPath, e_2, error_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('\n🚀 Starting to fetch missing data...\n');
                    return [4 /*yield*/, test_1.chromium.launch({
                            headless: false,
                            timeout: 60000
                        })];
                case 1:
                    browser = _d.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _d.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _d.sent();
                    logosDir = path.join(__dirname, 'test-results', 'logos');
                    if (!fs.existsSync(logosDir)) {
                        fs.mkdirSync(logosDir, { recursive: true });
                    }
                    // ========== 1. FETCH SPARK ME APP NAME FROM APP STORE ==========
                    console.log('📱 Fetching Spark Me app name from App Store...');
                    sparkMeAppName = 'Spark Me';
                    _d.label = 4;
                case 4:
                    _d.trys.push([4, 13, , 14]);
                    return [4 /*yield*/, page.goto('https://apps.apple.com/us/app/spark-me/id1578660405', {
                            waitUntil: 'networkidle',
                            timeout: 60000
                        })];
                case 5:
                    _d.sent();
                    selectors = [
                        'h1.product-header__title',
                        'h1[class*="product-header"]',
                        'header h1',
                        'h1.app-header__title',
                        'h1'
                    ];
                    _i = 0, selectors_1 = selectors;
                    _d.label = 6;
                case 6:
                    if (!(_i < selectors_1.length)) return [3 /*break*/, 12];
                    selector = selectors_1[_i];
                    _d.label = 7;
                case 7:
                    _d.trys.push([7, 10, , 11]);
                    nameElement = page.locator(selector).first();
                    return [4 /*yield*/, nameElement.waitFor({ state: 'visible', timeout: 5000 })];
                case 8:
                    _d.sent();
                    return [4 /*yield*/, nameElement.textContent()];
                case 9:
                    appName = _d.sent();
                    if (appName && appName.trim().length > 0) {
                        sparkMeAppName = appName.trim();
                        console.log("   \u2705 Found Spark Me app name: \"".concat(sparkMeAppName, "\""));
                        return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _d.sent();
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 6];
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_1 = _d.sent();
                    console.log("   \u26A0\uFE0F  Could not fetch Spark Me app name: ".concat(error_1));
                    return [3 /*break*/, 14];
                case 14:
                    appsToDownload = [
                        {
                            name: 'WavedIn',
                            platform: 'Play Store',
                            url: 'https://play.google.com/store/apps/details?id=com.waivedin',
                            filename: 'wavedin_playstore.png',
                            selectors: [
                                'img[alt*="Icon"]',
                                'img[itemprop="image"]',
                                'img.T75of',
                                'div[class*="icon"] img',
                                'img[src*="googleusercontent"]'
                            ]
                        },
                        {
                            name: 'WavedIn',
                            platform: 'App Store',
                            url: 'https://apps.apple.com/in/app/wavedin/id6451483729',
                            filename: 'wavedin_appstore.png',
                            selectors: [
                                'picture.product-hero__artwork img',
                                'img.we-artwork__image',
                                'picture img[src*="mzstatic"]',
                                'div.product-hero img',
                                'img[alt*="icon" i]'
                            ]
                        },
                        {
                            name: 'Algomax',
                            platform: 'Play Store',
                            url: 'https://play.google.com/store/apps/details?id=com.algomax',
                            filename: 'algomax_playstore.png',
                            selectors: [
                                'img[alt*="Icon"]',
                                'img[itemprop="image"]',
                                'img.T75of',
                                'div[class*="icon"] img',
                                'img[src*="googleusercontent"]'
                            ]
                        },
                        {
                            name: 'Algomax',
                            platform: 'App Store',
                            url: 'https://apps.apple.com/in/app/algomax/id6498886667',
                            filename: 'algomax_appstore.png',
                            selectors: [
                                'picture.product-hero__artwork img',
                                'img.we-artwork__image',
                                'picture img[src*="mzstatic"]',
                                'div.product-hero img',
                                'img[alt*="icon" i]'
                            ]
                        },
                        {
                            name: 'Auto eVantage',
                            platform: 'Play Store',
                            url: 'https://play.google.com/store/apps/details?id=com.autoevantage',
                            filename: 'auto_evantage_playstore.png',
                            selectors: [
                                'img[alt*="Icon"]',
                                'img[itemprop="image"]',
                                'img.T75of',
                                'div[class*="icon"] img',
                                'img[src*="googleusercontent"]'
                            ]
                        },
                        {
                            name: 'Auto eVantage',
                            platform: 'App Store',
                            url: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
                            filename: 'auto_evantage_appstore.png',
                            selectors: [
                                'picture.product-hero__artwork img',
                                'img.we-artwork__image',
                                'picture img[src*="mzstatic"]',
                                'div.product-hero img',
                                'img[alt*="icon" i]'
                            ]
                        },
                        {
                            name: 'Spark Me',
                            platform: 'Play Store',
                            url: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
                            filename: 'spark_me_playstore.png',
                            selectors: [
                                'img[alt*="Icon"]',
                                'img[itemprop="image"]',
                                'img.T75of',
                                'div[class*="icon"] img',
                                'img[src*="googleusercontent"]'
                            ]
                        }
                    ];
                    console.log('\n📥 Downloading logos...\n');
                    _a = 0, appsToDownload_1 = appsToDownload;
                    _d.label = 15;
                case 15:
                    if (!(_a < appsToDownload_1.length)) return [3 /*break*/, 29];
                    app = appsToDownload_1[_a];
                    console.log("\uD83D\uDCF1 ".concat(app.name, " (").concat(app.platform, ")..."));
                    _d.label = 16;
                case 16:
                    _d.trys.push([16, 25, , 26]);
                    return [4 /*yield*/, page.goto(app.url, {
                            waitUntil: 'networkidle',
                            timeout: 60000
                        })];
                case 17:
                    _d.sent();
                    logoDownloaded = false;
                    _b = 0, _c = app.selectors;
                    _d.label = 18;
                case 18:
                    if (!(_b < _c.length)) return [3 /*break*/, 24];
                    selector = _c[_b];
                    _d.label = 19;
                case 19:
                    _d.trys.push([19, 22, , 23]);
                    logoElement = page.locator(selector).first();
                    return [4 /*yield*/, logoElement.waitFor({ state: 'visible', timeout: 10000 })];
                case 20:
                    _d.sent();
                    return [4 /*yield*/, logoElement.screenshot({ timeout: 30000 })];
                case 21:
                    screenshot = _d.sent();
                    logoPath = path.join(logosDir, app.filename);
                    fs.writeFileSync(logoPath, screenshot);
                    console.log("   \u2705 Downloaded: ".concat(app.filename));
                    logoDownloaded = true;
                    return [3 /*break*/, 24];
                case 22:
                    e_2 = _d.sent();
                    return [3 /*break*/, 23];
                case 23:
                    _b++;
                    return [3 /*break*/, 18];
                case 24:
                    if (!logoDownloaded) {
                        console.log("   \u26A0\uFE0F  Could not download logo");
                    }
                    return [3 /*break*/, 26];
                case 25:
                    error_2 = _d.sent();
                    console.log("   \u274C Error: ".concat(error_2));
                    return [3 /*break*/, 26];
                case 26: return [4 /*yield*/, page.waitForTimeout(1000)];
                case 27:
                    _d.sent();
                    _d.label = 28;
                case 28:
                    _a++;
                    return [3 /*break*/, 15];
                case 29: return [4 /*yield*/, browser.close()];
                case 30:
                    _d.sent();
                    console.log('\n✅ Done!\n');
                    console.log("Spark Me app name: \"".concat(sparkMeAppName, "\""));
                    console.log('\nNext steps:');
                    console.log('1. Update generate-report.ts with the Spark Me app name');
                    console.log('2. Run: npx tsc generate-report.ts --esModuleInterop --resolveJsonModule && node generate-report.js');
                    return [2 /*return*/];
            }
        });
    });
}
downloadMissingData().catch(console.error);
