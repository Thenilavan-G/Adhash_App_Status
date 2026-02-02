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
var LogoComparison_1 = require("./utils/LogoComparison");
var unifiedTestData_1 = require("./config/unifiedTestData");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
/**
 * Script to fetch app logos from stores and save them
 */
function fetchLogos() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, context, page, logosDir, logoResults, _i, UNIFIED_TEST_DATA_1, appData, appKey, logoPath, error_1, logoPath, error_2;
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
                    console.log('\n🎨 Fetching App Logos from Stores\n');
                    console.log('='.repeat(80));
                    logosDir = path.join(__dirname, 'test-results', 'logos');
                    if (!fs.existsSync(logosDir)) {
                        fs.mkdirSync(logosDir, { recursive: true });
                    }
                    logoResults = {};
                    _i = 0, UNIFIED_TEST_DATA_1 = unifiedTestData_1.UNIFIED_TEST_DATA;
                    _a.label = 4;
                case 4:
                    if (!(_i < UNIFIED_TEST_DATA_1.length)) return [3 /*break*/, 19];
                    appData = UNIFIED_TEST_DATA_1[_i];
                    console.log("\n\uD83D\uDCF1 App: ".concat(appData.appName));
                    appKey = appData.appName.toLowerCase().replace(/\s+/g, '_');
                    logoResults[appKey] = { playstore: null, appstore: null };
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 9, , 10]);
                    console.log('   🤖 Fetching logo from Play Store...');
                    return [4 /*yield*/, page.goto(appData.playStore.directUrl, { timeout: 60000 })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle', { timeout: 30000 })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, LogoComparison_1.LogoComparison.downloadLogo(page, 'playstore', appData.appName)];
                case 8:
                    logoPath = _a.sent();
                    if (logoPath) {
                        logoResults[appKey].playstore = logoPath;
                        console.log("   \u2705 Play Store logo saved: ".concat(logoPath));
                    }
                    else {
                        console.log("   \u26A0\uFE0F Play Store logo not found");
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log("   \u274C Play Store logo failed: ".concat(error_1));
                    return [3 /*break*/, 10];
                case 10:
                    if (!!appData.appStore.skip) return [3 /*break*/, 17];
                    _a.label = 11;
                case 11:
                    _a.trys.push([11, 15, , 16]);
                    console.log('   🍎 Fetching logo from App Store...');
                    return [4 /*yield*/, page.goto(appData.appStore.directUrl, { timeout: 60000 })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, page.waitForLoadState('networkidle', { timeout: 30000 })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, LogoComparison_1.LogoComparison.downloadLogo(page, 'appstore', appData.appName)];
                case 14:
                    logoPath = _a.sent();
                    if (logoPath) {
                        logoResults[appKey].appstore = logoPath;
                        console.log("   \u2705 App Store logo saved: ".concat(logoPath));
                    }
                    else {
                        console.log("   \u26A0\uFE0F App Store logo not found");
                    }
                    return [3 /*break*/, 16];
                case 15:
                    error_2 = _a.sent();
                    console.log("   \u274C App Store logo failed: ".concat(error_2));
                    return [3 /*break*/, 16];
                case 16: return [3 /*break*/, 18];
                case 17:
                    console.log('   ⏭️  Skipping App Store logo');
                    _a.label = 18;
                case 18:
                    _i++;
                    return [3 /*break*/, 4];
                case 19: return [4 /*yield*/, browser.close()];
                case 20:
                    _a.sent();
                    console.log('\n' + '='.repeat(80));
                    console.log('\n📊 Logo Fetch Results:');
                    console.log(JSON.stringify(logoResults, null, 2));
                    console.log('\n✅ Logo fetching complete!');
                    return [2 /*return*/, logoResults];
            }
        });
    });
}
fetchLogos().catch(console.error);
