"use strict";
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
var LogoComparison_1 = require("./utils/LogoComparison");
/**
 * Simple script to download logos for all apps
 */
function downloadLogos() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, apps, _i, apps_1, app, logoPath, error_1, logoPath, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_1.chromium.launch({
                        headless: false,
                        channel: 'chrome'
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext({
                            viewport: { width: 1920, height: 1080 }
                        })];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    apps = [
                        {
                            name: 'AutoChecker',
                            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.autochecker',
                            appStoreUrl: null // Skip App Store for AutoChecker
                        },
                        {
                            name: 'WavedIn',
                            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.waivedin',
                            appStoreUrl: 'https://apps.apple.com/in/app/wavedin/id6451483729'
                        },
                        {
                            name: 'AlgoMax',
                            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.algomax',
                            appStoreUrl: 'https://apps.apple.com/in/app/algomax/id6498886667'
                        },
                        {
                            name: 'Auto Evantage',
                            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.autoevantage',
                            appStoreUrl: 'https://apps.apple.com/in/app/auto-evantage/id6747385992'
                        },
                        {
                            name: 'Spark Me',
                            playStoreUrl: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
                            appStoreUrl: 'https://apps.apple.com/us/app/spark-me/id1578660405'
                        }
                    ];
                    console.log('🚀 Starting logo download process...\n');
                    _i = 0, apps_1 = apps;
                    _a.label = 4;
                case 4:
                    if (!(_i < apps_1.length)) return [3 /*break*/, 19];
                    app = apps_1[_i];
                    console.log("\n\uD83D\uDCF1 Processing: ".concat(app.name));
                    console.log('─'.repeat(80));
                    if (!app.playStoreUrl) return [3 /*break*/, 10];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 9, , 10]);
                    console.log("\uD83E\uDD16 Navigating to Play Store...");
                    return [4 /*yield*/, page.goto(app.playStoreUrl, { waitUntil: 'networkidle', timeout: 60000 })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, LogoComparison_1.LogoComparison.downloadLogo(page, 'playstore', app.name)];
                case 8:
                    logoPath = _a.sent();
                    if (logoPath) {
                        console.log("   \u2705 Play Store logo downloaded successfully");
                    }
                    else {
                        console.log("   \u26A0\uFE0F  Play Store logo download failed");
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log("   \u274C Error downloading Play Store logo: ".concat(error_1));
                    return [3 /*break*/, 10];
                case 10:
                    if (!app.appStoreUrl) return [3 /*break*/, 16];
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 15, , 16]);
                    console.log("\uD83C\uDF4E Navigating to App Store...");
                    return [4 /*yield*/, page.goto(app.appStoreUrl, { waitUntil: 'networkidle', timeout: 60000 })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(2000)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, LogoComparison_1.LogoComparison.downloadLogo(page, 'appstore', app.name)];
                case 14:
                    logoPath = _a.sent();
                    if (logoPath) {
                        console.log("   \u2705 App Store logo downloaded successfully");
                    }
                    else {
                        console.log("   \u26A0\uFE0F  App Store logo download failed");
                    }
                    return [3 /*break*/, 16];
                case 15:
                    error_2 = _a.sent();
                    console.log("   \u274C Error downloading App Store logo: ".concat(error_2));
                    return [3 /*break*/, 16];
                case 16: return [4 /*yield*/, page.waitForTimeout(1000)];
                case 17:
                    _a.sent();
                    _a.label = 18;
                case 18:
                    _i++;
                    return [3 /*break*/, 4];
                case 19:
                    console.log('\n\n✅ Logo download process completed!');
                    console.log('─'.repeat(80));
                    return [4 /*yield*/, browser.close()];
                case 20:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
downloadLogos().catch(console.error);
