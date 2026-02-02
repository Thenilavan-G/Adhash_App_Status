/**
 * Unified Test Data Configuration
 * Contains app details for both Play Store and App Store verification
 */

export interface PlatformData {
  packageId?: string;
  appId?: string;
  directUrl: string;
  searchResultXpath: string;
  skip?: boolean; // Flag to skip this platform
}

export interface UnifiedAppDataV2 {
  appName: string;
  searchKeyword: string;
  playStore: PlatformData;
  appStore: PlatformData;
}

export const UNIFIED_TEST_DATA: UnifiedAppDataV2[] = [
  {
    appName: 'AutoChecker',
    searchKeyword: 'autochecker',
    playStore: {
      packageId: 'com.autochecker',
      directUrl: 'https://play.google.com/store/apps/details?id=com.autochecker',
      searchResultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
    },
    appStore: {
      appId: 'id6451483729',
      directUrl: 'https://apps.apple.com/in/app/autochecker/id6451483729',
      searchResultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a',
      skip: true // Skip AutoChecker for App Store
    }
  },
  {
    appName: 'WavedIn',
    searchKeyword: 'wavedin',
    playStore: {
      packageId: 'com.waivedin',
      directUrl: 'https://play.google.com/store/apps/details?id=com.waivedin',
      searchResultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
    },
    appStore: {
      appId: 'id6451483729',
      directUrl: 'https://apps.apple.com/in/app/wavedin/id6451483729',
      searchResultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    }
  },
  {
    appName: 'AlgoMax',
    searchKeyword: 'algomax',
    playStore: {
      packageId: 'com.algomax',
      directUrl: 'https://play.google.com/store/apps/details?id=com.algomax',
      searchResultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
    },
    appStore: {
      appId: 'id6498886667',
      directUrl: 'https://apps.apple.com/in/app/algomax/id6498886667',
      searchResultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    }
  },
  {
    appName: 'Auto Evantage',
    searchKeyword: 'auto evantage',
    playStore: {
      packageId: 'com.autoevantage',
      directUrl: 'https://play.google.com/store/apps/details?id=com.autoevantage',
      searchResultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
    },
    appStore: {
      appId: 'id6747385992',
      directUrl: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
      searchResultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    }
  },
  {
    appName: 'Spark Me',
    searchKeyword: 'Spark me',
    playStore: {
      packageId: 'com.adhash.sparkme',
      directUrl: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
      searchResultXpath: '/html/body/c-wiz[6]/div/div/c-wiz/c-wiz[1]/c-wiz/section/div/div/a'
    },
    appStore: {
      appId: 'id1578660405',
      directUrl: 'https://apps.apple.com/us/app/spark-me/id1578660405',
      searchResultXpath: '/html/body/div[2]/div[2]/div/div/div/div[3]/div/div[2]/div[1]/div/div[2]/div[1]/div/div[2]/h2/a'
    }
  }
];

export const PLAYSTORE_SELECTORS = {
  searchIcon: '/html/body/c-wiz[1]/header/nav/div/div[1]/button',
  searchInput: '/html/body/c-wiz[1]/header/nav/c-wiz/div/div/label/input'
};

export const APPSTORE_SELECTORS = {
  searchClick: '/html/body/div[1]/nav/div/ul/li[3]/a',
  searchInput: '/html/body/div[1]/nav/div/ul/li[3]/div/div/div/form/div[1]/input[1]'
};

