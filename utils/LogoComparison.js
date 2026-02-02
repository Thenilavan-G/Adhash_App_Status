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
exports.LogoComparison = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Utility for comparing app logos between platforms
 */
var LogoComparison = /** @class */ (function () {
    function LogoComparison() {
    }
    /**
     * Download and save app logo from a page
     * @param page - Playwright page object
     * @param platform - 'playstore' or 'appstore'
     * @param appName - Name of the app
     * @returns Path to the saved logo image or null if failed
     */
    LogoComparison.downloadLogo = function (page, platform, appName) {
        return __awaiter(this, void 0, void 0, function () {
            var logoElement, selectors, _i, selectors_1, selector, src, e_1, selectors, _a, selectors_2, selector, src, e_2, logoSrc, logosDir, sanitizedAppName, logoPath, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 18, , 19]);
                        logoElement = void 0;
                        if (!(platform === 'playstore')) return [3 /*break*/, 8];
                        selectors = [
                            'img[itemprop="image"]',
                            'img[alt*="Cover art"]',
                            'img.T75of',
                            'img[class*="cover"]',
                            'div[class*="icon"] img',
                            'img[src*="googleusercontent"]',
                            'img[src*="play-lh"]',
                            'img[alt*="icon"]',
                            'img[alt*="logo"]',
                            'header img',
                            'div[role="img"] img'
                        ];
                        _i = 0, selectors_1 = selectors;
                        _b.label = 1;
                    case 1:
                        if (!(_i < selectors_1.length)) return [3 /*break*/, 7];
                        selector = selectors_1[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        logoElement = page.locator(selector).first();
                        return [4 /*yield*/, logoElement.waitFor({ state: 'visible', timeout: 10000 })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, logoElement.getAttribute('src')];
                    case 4:
                        src = _b.sent();
                        if (src && src.length > 0) {
                            console.log("   \u2713 Found logo using selector: ".concat(selector));
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 15];
                    case 8:
                        selectors = [
                            'picture.we-artwork img',
                            'img[class*="we-artwork"]',
                            'picture img[src*="mzstatic"]',
                            'img[src*="is1-ssl"]',
                            'img[src*="is2-ssl"]',
                            'img[src*="is3-ssl"]',
                            'img[src*="is4-ssl"]',
                            'img[src*="is5-ssl"]',
                            'picture source[type="image/png"] + img',
                            'div[class*="artwork"] img',
                            'header img[src*="mzstatic"]'
                        ];
                        _a = 0, selectors_2 = selectors;
                        _b.label = 9;
                    case 9:
                        if (!(_a < selectors_2.length)) return [3 /*break*/, 15];
                        selector = selectors_2[_a];
                        _b.label = 10;
                    case 10:
                        _b.trys.push([10, 13, , 14]);
                        logoElement = page.locator(selector).first();
                        return [4 /*yield*/, logoElement.waitFor({ state: 'visible', timeout: 10000 })];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, logoElement.getAttribute('src')];
                    case 12:
                        src = _b.sent();
                        if (src && src.length > 0) {
                            console.log("   \u2713 Found logo using selector: ".concat(selector));
                            return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _b.sent();
                        return [3 /*break*/, 14];
                    case 14:
                        _a++;
                        return [3 /*break*/, 9];
                    case 15:
                        if (!logoElement) {
                            console.log("   \u26A0 Could not find logo element for ".concat(appName, " on ").concat(platform));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, logoElement.getAttribute('src')];
                    case 16:
                        logoSrc = _b.sent();
                        if (!logoSrc) {
                            console.log("   \u26A0 Could not find logo src for ".concat(appName, " on ").concat(platform));
                            return [2 /*return*/, null];
                        }
                        logosDir = path.join(process.cwd(), 'test-results', 'logos');
                        if (!fs.existsSync(logosDir)) {
                            fs.mkdirSync(logosDir, { recursive: true });
                        }
                        sanitizedAppName = appName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                        logoPath = path.join(logosDir, "".concat(sanitizedAppName, "_").concat(platform, ".png"));
                        // Take screenshot of the logo element with increased timeout
                        return [4 /*yield*/, logoElement.screenshot({
                                path: logoPath,
                                timeout: 30000 // 30 seconds timeout for screenshot
                            })];
                    case 17:
                        // Take screenshot of the logo element with increased timeout
                        _b.sent();
                        console.log("   \u2713 Logo saved: ".concat(logoPath));
                        return [2 /*return*/, logoPath];
                    case 18:
                        error_1 = _b.sent();
                        console.log("   \u26A0 Failed to download logo for ".concat(appName, " on ").concat(platform, ": ").concat(error_1));
                        return [2 /*return*/, null];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Compare two logo images using visual similarity
     * @param logo1Path - Path to first logo
     * @param logo2Path - Path to second logo
     * @returns Similarity score (0-100) or null if comparison failed
     */
    LogoComparison.compareLogos = function (logo1Path, logo2Path) {
        return __awaiter(this, void 0, void 0, function () {
            var stats1, stats2, sizeDiff, avgSize, similarity;
            return __generator(this, function (_a) {
                // For now, we'll do a simple file existence check
                // In a production environment, you would use image comparison libraries like pixelmatch or resemblejs
                if (!logo1Path || !logo2Path) {
                    return [2 /*return*/, null];
                }
                if (!fs.existsSync(logo1Path) || !fs.existsSync(logo2Path)) {
                    return [2 /*return*/, null];
                }
                stats1 = fs.statSync(logo1Path);
                stats2 = fs.statSync(logo2Path);
                sizeDiff = Math.abs(stats1.size - stats2.size);
                avgSize = (stats1.size + stats2.size) / 2;
                similarity = Math.max(0, 100 - (sizeDiff / avgSize * 100));
                console.log("   \uD83D\uDCCA Logo similarity: ".concat(similarity.toFixed(1), "%"));
                // For a more accurate comparison, you would use:
                // - pixelmatch library
                // - resemblejs
                // - OpenCV
                // But for this demo, we'll use file size as a proxy
                return [2 /*return*/, similarity];
            });
        });
    };
    /**
     * Convert logo to base64 for embedding in HTML report
     * @param logoPath - Path to logo image
     * @returns Base64 encoded image string or null
     */
    LogoComparison.logoToBase64 = function (logoPath) {
        if (!logoPath || !fs.existsSync(logoPath)) {
            return null;
        }
        try {
            var imageBuffer = fs.readFileSync(logoPath);
            var base64Image = imageBuffer.toString('base64');
            return "data:image/png;base64,".concat(base64Image);
        }
        catch (error) {
            console.log("   \u26A0 Failed to convert logo to base64: ".concat(error));
            return null;
        }
    };
    return LogoComparison;
}());
exports.LogoComparison = LogoComparison;
