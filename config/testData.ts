/**
 * Test Data Configuration
 * Contains all app details for verification
 */

export interface AppData {
  keyword: string;
  expectedHref: string;
  resultXpath: string;
  appName: string;
}

export const APP_TEST_DATA: AppData[] = [
  {
    appName: 'AutoChecker',
    keyword: 'autochecker',
    expectedHref: '/store/apps/details?id=com.autochecker',
    resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
  },
  {
    appName: 'WavedIn',
    keyword: 'wavedin',
    expectedHref: '/store/apps/details?id=com.waivedin',
    resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz/c-wiz/section/div/div/div/div[1]/div/div/div[1]/div/a'
  },
  {
    appName: 'AlgoMax',
    keyword: 'algomax',
    expectedHref: '/store/apps/details?id=com.algomax',
    resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
  },
  {
    appName: 'Auto Evantage',
    keyword: 'auto evantage',
    expectedHref: '/store/apps/details?id=com.autoevantage',
    resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
  },
  {
    appName: 'Spark Me',
    keyword: 'Spark me',
    expectedHref: '/store/apps/details?id=com.adhash.sparkme', // Updated to actual package ID
    resultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
  }
];

export const SELECTORS = {
  searchIcon: '/html/body/c-wiz[1]/header/nav/div/div[1]/button',
  searchInput: '/html/body/c-wiz[1]/header/nav/c-wiz/div/div/label/input'
};

