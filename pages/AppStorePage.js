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
exports.AppStorePage = void 0;
var appStoreTestData_1 = require("../config/appStoreTestData");
/**
 * Page Object Model for Apple App Store
 * Contains all methods to interact with App Store pages
 */
var AppStorePage = /** @class */ (function () {
    function AppStorePage(page) {
        this.page = page;
        this.searchClick = page.locator("xpath=".concat(appStoreTestData_1.APPSTORE_SELECTORS.searchClick));
        this.searchInput = page.locator("xpath=".concat(appStoreTestData_1.APPSTORE_SELECTORS.searchInput));
    }
    /**
     * Navigate to Apple App Store
     */
    AppStorePage.prototype.navigateToAppStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('https://www.apple.com/in/app-store/', { waitUntil: 'domcontentloaded' })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForLoadState('networkidle')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Click on the search icon to open search field
     */
    AppStorePage.prototype.clickSearchIcon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, altSearchButton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 7]);
                        return [4 /*yield*/, this.searchClick.waitFor({ state: 'visible', timeout: 10000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.searchClick.click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForTimeout(1000)];
                    case 3:
                        _a.sent(); // Wait for search field to appear
                        return [3 /*break*/, 7];
                    case 4:
                        error_1 = _a.sent();
                        console.log("   \u26A0 Search icon XPath not found, trying alternative selector...");
                        altSearchButton = this.page.locator('a[aria-label*="Search"]').first();
                        return [4 /*yield*/, altSearchButton.click()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForTimeout(1000)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search for an app by keyword
     * @param keyword - The search term to enter
     * @param isFirstSearch - Whether this is the first search (default: false)
     */
    AppStorePage.prototype.searchApp = function (keyword_1) {
        return __awaiter(this, arguments, void 0, function (keyword, isFirstSearch) {
            var searchInputLocator, xpathInput, error_2, altInput, error_3, altInput2, error2_1;
            if (isFirstSearch === void 0) { isFirstSearch = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!isFirstSearch) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.navigateToAppStore()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.clickSearchIcon()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: 
                    // Wait a bit for the search field to be ready
                    return [4 /*yield*/, this.page.waitForTimeout(2000)];
                    case 4:
                        // Wait a bit for the search field to be ready
                        _a.sent();
                        searchInputLocator = null;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        xpathInput = this.page.locator("xpath=".concat(appStoreTestData_1.APPSTORE_SELECTORS.searchInput));
                        return [4 /*yield*/, xpathInput.waitFor({ state: 'visible', timeout: 5000 })];
                    case 6:
                        _a.sent();
                        searchInputLocator = xpathInput;
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        console.log("   \u26A0 XPath search input not found, trying alternatives...");
                        return [3 /*break*/, 8];
                    case 8:
                        if (!!searchInputLocator) return [3 /*break*/, 16];
                        _a.label = 9;
                    case 9:
                        _a.trys.push([9, 11, , 16]);
                        altInput = this.page.locator('input[type="search"]').first();
                        return [4 /*yield*/, altInput.waitFor({ state: 'visible', timeout: 5000 })];
                    case 10:
                        _a.sent();
                        searchInputLocator = altInput;
                        console.log("   \u2713 Found search input using alternative selector");
                        return [3 /*break*/, 16];
                    case 11:
                        error_3 = _a.sent();
                        _a.label = 12;
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        altInput2 = this.page.locator('input[placeholder*="Search"]').first();
                        return [4 /*yield*/, altInput2.waitFor({ state: 'visible', timeout: 5000 })];
                    case 13:
                        _a.sent();
                        searchInputLocator = altInput2;
                        console.log("   \u2713 Found search input using placeholder selector");
                        return [3 /*break*/, 15];
                    case 14:
                        error2_1 = _a.sent();
                        throw new Error('Could not find search input field with any selector');
                    case 15: return [3 /*break*/, 16];
                    case 16: 
                    // Clear and fill the search field
                    return [4 /*yield*/, searchInputLocator.clear()];
                    case 17:
                        // Clear and fill the search field
                        _a.sent();
                        return [4 /*yield*/, searchInputLocator.fill(keyword)];
                    case 18:
                        _a.sent();
                        // Press Enter to search
                        return [4 /*yield*/, searchInputLocator.press('Enter')];
                    case 19:
                        // Press Enter to search
                        _a.sent();
                        // Wait for search results to load
                        return [4 /*yield*/, this.page.waitForLoadState('networkidle')];
                    case 20:
                        // Wait for search results to load
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForTimeout(3000)];
                    case 21:
                        _a.sent(); // Additional wait for results to render
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the href attribute from the search result
     * @param xpath - XPath of the result element
     * @param expectedAppId - Expected app ID to search for
     * @returns The href value or null if not found
     */
    AppStorePage.prototype.getResultHref = function (xpath, expectedAppId) {
        return __awaiter(this, void 0, void 0, function () {
            var resultElement, href, error_4, appIdSelector, appElement, href, appIdError_1, firstResult, href, fallbackError_1, anyResult, href, lastError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Wait a bit for results to fully load
                    return [4 /*yield*/, this.page.waitForTimeout(2000)];
                    case 1:
                        // Wait a bit for results to fully load
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 20]);
                        resultElement = this.page.locator("xpath=".concat(xpath));
                        return [4 /*yield*/, resultElement.waitFor({ state: 'visible', timeout: 10000 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, resultElement.getAttribute('href')];
                    case 4:
                        href = _a.sent();
                        console.log("   \u2713 Found using XPath");
                        return [2 /*return*/, href];
                    case 5:
                        error_4 = _a.sent();
                        console.log("   \u26A0 XPath not found, trying alternative selectors...");
                        if (!expectedAppId) return [3 /*break*/, 10];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 9, , 10]);
                        appIdSelector = "a[href*=\"".concat(expectedAppId, "\"]");
                        appElement = this.page.locator(appIdSelector).first();
                        return [4 /*yield*/, appElement.waitFor({ state: 'visible', timeout: 10000 })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, appElement.getAttribute('href')];
                    case 8:
                        href = _a.sent();
                        console.log("   \u2713 Found using app ID selector");
                        return [2 /*return*/, href];
                    case 9:
                        appIdError_1 = _a.sent();
                        console.log("   \u26A0 App ID selector also failed, trying more alternatives...");
                        return [3 /*break*/, 10];
                    case 10:
                        _a.trys.push([10, 13, , 19]);
                        firstResult = this.page.locator('h2 a[href*="apps.apple.com"]').first();
                        return [4 /*yield*/, firstResult.waitFor({ state: 'visible', timeout: 10000 })];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, firstResult.getAttribute('href')];
                    case 12:
                        href = _a.sent();
                        console.log("   \u2713 Found using h2 > a selector");
                        return [2 /*return*/, href];
                    case 13:
                        fallbackError_1 = _a.sent();
                        _a.label = 14;
                    case 14:
                        _a.trys.push([14, 17, , 18]);
                        anyResult = this.page.locator('a[href*="apps.apple.com/"]').first();
                        return [4 /*yield*/, anyResult.waitFor({ state: 'visible', timeout: 10000 })];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, anyResult.getAttribute('href')];
                    case 16:
                        href = _a.sent();
                        console.log("   \u26A0 Using first available app store link");
                        return [2 /*return*/, href];
                    case 17:
                        lastError_1 = _a.sent();
                        console.error("   \u2717 All selector methods failed");
                        return [2 /*return*/, null];
                    case 18: return [3 /*break*/, 19];
                    case 19: return [3 /*break*/, 20];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verify if the app href matches the expected value
     * @param actualHref - The actual href value from the page
     * @param expectedHref - The expected href value
     * @returns true if match, false otherwise
     */
    AppStorePage.prototype.verifyAppHref = function (actualHref, expectedHref) {
        if (!actualHref) {
            return false;
        }
        // Normalize URLs for comparison (remove trailing slashes, query params)
        var normalizeUrl = function (url) {
            return url.split('?')[0].replace(/\/$/, '').toLowerCase();
        };
        var normalizedActual = normalizeUrl(actualHref);
        var normalizedExpected = normalizeUrl(expectedHref);
        return normalizedActual === normalizedExpected || normalizedActual.includes(normalizedExpected);
    };
    /**
     * Get the app name from the App Store page
     * @returns The app name or null if not found
     */
    AppStorePage.prototype.getAppName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectors, _i, selectors_1, selector, nameElement, appName, e_1, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        selectors = [
                            'h1.product-header__title',
                            'h1[class*="product-header"]',
                            'header h1',
                            'h1.app-header__title',
                            'h1'
                        ];
                        _i = 0, selectors_1 = selectors;
                        _a.label = 1;
                    case 1:
                        if (!(_i < selectors_1.length)) return [3 /*break*/, 7];
                        selector = selectors_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        nameElement = this.page.locator(selector).first();
                        return [4 /*yield*/, nameElement.waitFor({ state: 'visible', timeout: 5000 })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, nameElement.textContent()];
                    case 4:
                        appName = _a.sent();
                        if (appName && appName.trim().length > 0) {
                            console.log("   \u2713 Found app name: ".concat(appName.trim()));
                            return [2 /*return*/, appName.trim()];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7:
                        console.log("   \u26A0 Could not find app name");
                        return [2 /*return*/, null];
                    case 8:
                        error_5 = _a.sent();
                        console.log("   \u26A0 Error getting app name: ".concat(error_5));
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navigate back to search to perform another search
     */
    AppStorePage.prototype.navigateBackToSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clickSearchIcon()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AppStorePage;
}());
exports.AppStorePage = AppStorePage;
