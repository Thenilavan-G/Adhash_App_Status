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
exports.PlayStorePage = void 0;
var testData_1 = require("../config/testData");
/**
 * Page Object Model for Google Play Store
 * Contains all methods to interact with Play Store pages
 */
var PlayStorePage = /** @class */ (function () {
    function PlayStorePage(page) {
        this.page = page;
        this.searchIcon = page.locator("xpath=".concat(testData_1.SELECTORS.searchIcon));
        this.searchInput = page.locator("xpath=".concat(testData_1.SELECTORS.searchInput));
    }
    /**
     * Navigate to Google Play Store Apps page
     */
    PlayStorePage.prototype.navigateToPlayStore = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto('/store/apps', { waitUntil: 'domcontentloaded' })];
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
    PlayStorePage.prototype.clickSearchIcon = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchIcon.waitFor({ state: 'visible', timeout: 10000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.searchIcon.click()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForTimeout(1000)];
                    case 3:
                        _a.sent(); // Wait for search field to appear
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search for an app by keyword
     * @param keyword - The search term to enter
     */
    PlayStorePage.prototype.searchApp = function (keyword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Clear the search field first
                    return [4 /*yield*/, this.searchInput.waitFor({ state: 'visible', timeout: 10000 })];
                    case 1:
                        // Clear the search field first
                        _a.sent();
                        return [4 /*yield*/, this.searchInput.clear()];
                    case 2:
                        _a.sent();
                        // Type the keyword
                        return [4 /*yield*/, this.searchInput.fill(keyword)];
                    case 3:
                        // Type the keyword
                        _a.sent();
                        // Press Enter to search
                        return [4 /*yield*/, this.searchInput.press('Enter')];
                    case 4:
                        // Press Enter to search
                        _a.sent();
                        // Wait for search results to load
                        return [4 /*yield*/, this.page.waitForLoadState('networkidle')];
                    case 5:
                        // Wait for search results to load
                        _a.sent();
                        return [4 /*yield*/, this.page.waitForTimeout(2000)];
                    case 6:
                        _a.sent(); // Additional wait for results to render
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the href attribute from the first search result
     * @param xpath - XPath of the result element
     * @param expectedPackageId - Expected package ID to search for
     * @returns The href value or null if not found
     */
    PlayStorePage.prototype.getResultHref = function (xpath, expectedPackageId) {
        return __awaiter(this, void 0, void 0, function () {
            var resultElement, href, error_1, packageSelector, packageElement, href, pkgError_1, firstResult, href, fallbackError_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 13]);
                        resultElement = this.page.locator("xpath=".concat(xpath));
                        return [4 /*yield*/, resultElement.waitFor({ state: 'visible', timeout: 5000 })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, resultElement.getAttribute('href')];
                    case 2:
                        href = _a.sent();
                        return [2 /*return*/, href];
                    case 3:
                        error_1 = _a.sent();
                        console.log("   \u26A0 XPath not found, trying alternative selectors...");
                        if (!expectedPackageId) return [3 /*break*/, 8];
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        packageSelector = "a[href*=\"".concat(expectedPackageId, "\"]");
                        packageElement = this.page.locator(packageSelector).first();
                        return [4 /*yield*/, packageElement.waitFor({ state: 'visible', timeout: 5000 })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, packageElement.getAttribute('href')];
                    case 6:
                        href = _a.sent();
                        console.log("   \u2713 Found using package ID selector");
                        return [2 /*return*/, href];
                    case 7:
                        pkgError_1 = _a.sent();
                        console.log("   \u2717 Package ID selector also failed");
                        return [3 /*break*/, 8];
                    case 8:
                        _a.trys.push([8, 11, , 12]);
                        firstResult = this.page.locator('section a[href*="details?id="]').first();
                        return [4 /*yield*/, firstResult.waitFor({ state: 'visible', timeout: 5000 })];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, firstResult.getAttribute('href')];
                    case 10:
                        href = _a.sent();
                        console.log("   \u26A0 Using first search result instead");
                        return [2 /*return*/, href];
                    case 11:
                        fallbackError_1 = _a.sent();
                        console.error("   \u2717 All selector methods failed");
                        return [2 /*return*/, null];
                    case 12: return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
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
    PlayStorePage.prototype.verifyAppHref = function (actualHref, expectedHref) {
        if (!actualHref) {
            return false;
        }
        return actualHref.includes(expectedHref) || actualHref === expectedHref;
    };
    /**
     * Get the app name from the Play Store page
     * @returns The app name or null if not found
     */
    PlayStorePage.prototype.getAppName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectors, _i, selectors_1, selector, nameElement, appName, e_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        selectors = [
                            'h1[itemprop="name"]',
                            'h1.Fd93Bb',
                            'header h1',
                            'div[class*="title"] h1',
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
                        error_2 = _a.sent();
                        console.log("   \u26A0 Error getting app name: ".concat(error_2));
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navigate back to search to perform another search
     */
    PlayStorePage.prototype.navigateBackToSearch = function () {
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
    return PlayStorePage;
}());
exports.PlayStorePage = PlayStorePage;
