"use strict";
/**
 * Apple App Store Test Data Configuration
 * Contains all app details for verification
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPSTORE_SELECTORS = exports.APPSTORE_TEST_DATA = void 0;
exports.APPSTORE_TEST_DATA = [
    {
        appName: 'WavedIn',
        keyword: 'wavedin',
        expectedHref: 'https://apps.apple.com/in/app/wavedin/id6451483729',
        resultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    },
    {
        appName: 'AlgoMax',
        keyword: 'algomax',
        expectedHref: 'https://apps.apple.com/in/app/algomax/id6498886667',
        resultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    },
    {
        appName: 'Auto Evantage',
        keyword: 'auto evantage',
        expectedHref: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
        resultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    },
    {
        appName: 'Spark Me',
        keyword: 'spark me',
        expectedHref: 'https://apps.apple.com/us/app/spark-me/id1578660405',
        resultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    }
];
exports.APPSTORE_SELECTORS = {
    searchClick: '/html/body/div[1]/nav/div/ul/li[3]/a',
    searchInput: '/html/body/div[1]/nav/div/ul/li[3]/div/div/div/form/div[1]/input[1]'
};
