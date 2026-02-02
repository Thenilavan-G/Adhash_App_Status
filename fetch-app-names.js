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
var PlayStorePage_1 = require("./pages/PlayStorePage");
var AppStorePage_1 = require("./pages/AppStorePage");
var unifiedTestData_1 = require("./config/unifiedTestData");
/**
 * Simple script to fetch app names from stores
 */
function fetchAppNames() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, appNames, _i, UNIFIED_TEST_DATA_1, appData, fetchedName, appStorePage, error_1, playStorePage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_1.chromium.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newContext()];
                case 2:
                    context = _a.sent();
                    return [4 /*yield*/, context.newPage()];
                case 3:
                    page = _a.sent();
                    console.log('\n🚀 Fetching App Names from Stores\n');
                    console.log('='.repeat(80));
                    appNames = {};
                    _i = 0, UNIFIED_TEST_DATA_1 = unifiedTestData_1.UNIFIED_TEST_DATA;
                    _a.label = 4;
                case 4:
                    if (!(_i < UNIFIED_TEST_DATA_1.length)) return [3 /*break*/, 18];
                    appData = UNIFIED_TEST_DATA_1[_i];
                    console.log("\n\uD83D\uDCF1 App: ".concat(appData.appName));
                    fetchedName = null;
                    if (!!appData.appStore.skip) return [3 /*break*/, 10];
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 9, , 10]);
                    console.log('   📝 Fetching from App Store...');
                    appStorePage = new AppStorePage_1.AppStorePage(page);
                    return [4 /*yield*/, page.goto(appData.appStore.directUrl, { timeout: 30000 })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, appStorePage.getAppName()];
                case 8:
                    fetchedName = _a.sent();
                    if (fetchedName) {
                        console.log("   \u2713 App Store name: ".concat(fetchedName));
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log("   \u26A0 App Store failed: ".concat(error_1));
                    return [3 /*break*/, 10];
                case 10:
                    if (!!fetchedName) return [3 /*break*/, 16];
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 15, , 16]);
                    console.log('   📝 Fetching from Play Store...');
                    playStorePage = new PlayStorePage_1.PlayStorePage(page);
                    return [4 /*yield*/, page.goto(appData.playStore.directUrl, { timeout: 30000 })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle')];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, playStorePage.getAppName()];
                case 14:
                    fetchedName = _a.sent();
                    if (fetchedName) {
                        console.log("   \u2713 Play Store name: ".concat(fetchedName));
                    }
                    return [3 /*break*/, 16];
                case 15:
                    error_2 = _a.sent();
                    console.log("   \u26A0 Play Store failed: ".concat(error_2));
                    return [3 /*break*/, 16];
                case 16:
                    appNames[appData.appName] = fetchedName || appData.appName;
                    console.log("   \u2705 Final name: ".concat(appNames[appData.appName]));
                    _a.label = 17;
                case 17:
                    _i++;
                    return [3 /*break*/, 4];
                case 18: return [4 /*yield*/, browser.close()];
                case 19:
                    _a.sent();
                    console.log('\n' + '='.repeat(80));
                    console.log('\n📊 Fetched App Names:');
                    console.log(JSON.stringify(appNames, null, 2));
                    return [2 /*return*/, appNames];
            }
        });
    });
}
fetchAppNames().catch(console.error);
