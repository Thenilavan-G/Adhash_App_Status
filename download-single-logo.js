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
/**
 * Download a single logo - run this script multiple times for each logo
 * Usage: node download-single-logo.js <url> <platform> <filename>
 */
var args = process.argv.slice(2);
var url = args[0];
var platform = args[1];
var filename = args[2];
if (!url || !platform || !filename) {
    console.log('Usage: node download-single-logo.js <url> <platform> <filename>');
    console.log('Example: node download-single-logo.js "https://play.google.com/store/apps/details?id=com.algomax" playstore algomax_playstore.png');
    process.exit(1);
}
function downloadLogo() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, logoElement, selectors, _i, selectors_1, selector, element, e_1, selectors, _a, selectors_2, selector, element, e_2, logoDir, logoPath, stats, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\n\uD83D\uDE80 Starting logo download...");
                    console.log("   URL: ".concat(url));
                    console.log("   Platform: ".concat(platform));
                    console.log("   Filename: ".concat(filename, "\n"));
                    return [4 /*yield*/, playwright_1.chromium.launch({
                            headless: false,
                            channel: 'chrome'
                        })];
                case 1:
                    browser = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 24, , 26]);
                    return [4 /*yield*/, browser.newPage({
                            viewport: { width: 1920, height: 1080 }
                        })];
                case 3:
                    page = _b.sent();
                    // Set longer timeouts
                    page.setDefaultTimeout(90000); // 90 seconds
                    console.log("\uD83D\uDCC4 Navigating to page...");
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'domcontentloaded' })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle')];
                case 5:
                    _b.sent();
                    console.log("\u2713 Page loaded");
                    // Wait for images to load
                    return [4 /*yield*/, page.waitForTimeout(5000)];
                case 6:
                    // Wait for images to load
                    _b.sent();
                    logoElement = null;
                    if (!(platform === 'playstore')) return [3 /*break*/, 13];
                    console.log("\uD83D\uDD0D Searching for Play Store logo...");
                    selectors = [
                        'img[alt*="icon" i]',
                        'img[itemprop="image"]',
                        'img.T75of',
                        'div[class*="icon"] img',
                        'header img',
                        'img[src*="googleusercontent"]'
                    ];
                    _i = 0, selectors_1 = selectors;
                    _b.label = 7;
                case 7:
                    if (!(_i < selectors_1.length)) return [3 /*break*/, 12];
                    selector = selectors_1[_i];
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 10, , 11]);
                    console.log("   Trying: ".concat(selector));
                    element = page.locator(selector).first();
                    return [4 /*yield*/, element.waitFor({ state: 'visible', timeout: 10000 })];
                case 9:
                    _b.sent();
                    logoElement = element;
                    console.log("   \u2705 Found logo using: ".concat(selector));
                    return [3 /*break*/, 12];
                case 10:
                    e_1 = _b.sent();
                    console.log("   \u2717 Not found");
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 7];
                case 12: return [3 /*break*/, 19];
                case 13:
                    console.log("\uD83D\uDD0D Searching for App Store logo...");
                    selectors = [
                        'picture.product-hero__artwork img',
                        'picture img[class*="artwork"]',
                        'div[class*="artwork"] img',
                        'header img',
                        'img[src*="is1-ssl.mzstatic.com"]',
                        'img[class*="product-hero"]'
                    ];
                    _a = 0, selectors_2 = selectors;
                    _b.label = 14;
                case 14:
                    if (!(_a < selectors_2.length)) return [3 /*break*/, 19];
                    selector = selectors_2[_a];
                    _b.label = 15;
                case 15:
                    _b.trys.push([15, 17, , 18]);
                    console.log("   Trying: ".concat(selector));
                    element = page.locator(selector).first();
                    return [4 /*yield*/, element.waitFor({ state: 'visible', timeout: 10000 })];
                case 16:
                    _b.sent();
                    logoElement = element;
                    console.log("   \u2705 Found logo using: ".concat(selector));
                    return [3 /*break*/, 19];
                case 17:
                    e_2 = _b.sent();
                    console.log("   \u2717 Not found");
                    return [3 /*break*/, 18];
                case 18:
                    _a++;
                    return [3 /*break*/, 14];
                case 19:
                    if (!!logoElement) return [3 /*break*/, 21];
                    console.log("\n\u274C Could not find logo element on the page");
                    return [4 /*yield*/, browser.close()];
                case 20:
                    _b.sent();
                    process.exit(1);
                    _b.label = 21;
                case 21:
                    logoDir = path.join(__dirname, 'test-results', 'logos');
                    if (!fs.existsSync(logoDir)) {
                        fs.mkdirSync(logoDir, { recursive: true });
                        console.log("\u2713 Created directory: ".concat(logoDir));
                    }
                    logoPath = path.join(logoDir, filename);
                    console.log("\n\uD83D\uDCF8 Taking screenshot...");
                    return [4 /*yield*/, logoElement.screenshot({ path: logoPath })];
                case 22:
                    _b.sent();
                    stats = fs.statSync(logoPath);
                    console.log("\n\u2705 Logo saved successfully!");
                    console.log("   Path: ".concat(logoPath));
                    console.log("   Size: ".concat(stats.size, " bytes"));
                    return [4 /*yield*/, browser.close()];
                case 23:
                    _b.sent();
                    return [3 /*break*/, 26];
                case 24:
                    error_1 = _b.sent();
                    console.log("\n\u274C Error: ".concat(error_1));
                    return [4 /*yield*/, browser.close()];
                case 25:
                    _b.sent();
                    process.exit(1);
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
downloadLogo();
