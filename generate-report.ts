import { CustomHtmlReporter } from './utils/CustomHtmlReporter';
import { AppTestResult } from './utils/TestResult';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Convert logo file to base64
 */
function convertLogoToBase64(logoPath: string | null): string | null {
  if (!logoPath) return null;

  try {
    const fullPath = path.join(__dirname, logoPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Logo file not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = logoPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.log(`❌ Error converting logo to base64: ${error}`);
    return null;
  }
}

// Sample data to generate the report
const sampleResults: AppTestResult[] = [
  {
    appName: 'AutoChecker',
    keyword: 'autochecker',
    platform: 'Play Store',
    expectedHref: 'https://play.google.com/store/apps/details?id=com.autochecker',
    actualHref: 'https://play.google.com/store/apps/details?id=com.autochecker',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/autochecker_playstore.png' // ✅ REAL LOGO
  },
  {
    appName: 'WavedIn', // ✅ REAL NAME from App Store
    keyword: 'wavedin',
    platform: 'Play Store',
    expectedHref: 'https://play.google.com/store/apps/details?id=com.waivedin',
    actualHref: 'https://play.google.com/store/apps/details?id=com.waivedin',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/wavedin_playstore.png' // ✅ REAL LOGO from Play Store
  },
  {
    appName: 'WavedIn', // ✅ REAL NAME from App Store
    keyword: 'wavedin',
    platform: 'App Store',
    expectedHref: 'https://apps.apple.com/in/app/wavedin/id6451483729',
    actualHref: 'https://apps.apple.com/in/app/wavedin/id6451483729',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/wavedin_appstore.png'
  },
  {
    appName: 'Algomax', // ✅ REAL NAME from App Store (lowercase 'm')
    keyword: 'algomax',
    platform: 'Play Store',
    expectedHref: 'https://play.google.com/store/apps/details?id=com.algomax',
    actualHref: 'https://play.google.com/store/apps/details?id=com.algomax',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/algomax_playstore.png' // ✅ REAL LOGO
  },
  {
    appName: 'Algomax', // ✅ REAL NAME from App Store (lowercase 'm')
    keyword: 'algomax',
    platform: 'App Store',
    expectedHref: 'https://apps.apple.com/in/app/algomax/id6498886667',
    actualHref: 'https://apps.apple.com/in/app/algomax/id6498886667',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/algomax_appstore.png'
  },
  {
    appName: 'Auto eVantage', // ✅ REAL NAME from App Store (lowercase 'e')
    keyword: 'auto evantage',
    platform: 'Play Store',
    expectedHref: 'https://play.google.com/store/apps/details?id=com.autoevantage',
    actualHref: 'https://play.google.com/store/apps/details?id=com.autoevantage',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/auto_evantage_playstore.png' // ✅ REAL LOGO
  },
  {
    appName: 'Auto eVantage', // ✅ REAL NAME from App Store (lowercase 'e')
    keyword: 'auto evantage',
    platform: 'App Store',
    expectedHref: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
    actualHref: 'https://apps.apple.com/in/app/auto-evantage/id6747385992',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/auto_evantage_appstore.png' // ✅ REAL LOGO
  },
  {
    appName: 'Spark me', // ✅ REAL NAME from App Store (lowercase 'm')
    keyword: 'spark me',
    platform: 'Play Store',
    expectedHref: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
    actualHref: 'https://play.google.com/store/apps/details?id=com.adhash.sparkme',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/spark_me_playstore.png' // ✅ REAL LOGO
  },
  {
    appName: 'Spark me', // ✅ REAL NAME from App Store (lowercase 'm')
    keyword: 'spark me',
    platform: 'App Store',
    expectedHref: 'https://apps.apple.com/us/app/spark-me/id1578660405',
    actualHref: 'https://apps.apple.com/us/app/spark-me/id1578660405',
    status: 'PASS',
    timestamp: new Date().toISOString(),
    logoPath: 'test-results/logos/spark_me_appstore.png' // ✅ REAL LOGO
  }
];

// Convert all logos to base64
console.log('\n🎨 Converting logos to base64...');
const resultsWithLogos = sampleResults.map(result => {
  if (result.logoPath) {
    const logoBase64 = convertLogoToBase64(result.logoPath);
    if (logoBase64) {
      console.log(`✅ Converted logo for ${result.appName} (${result.platform})`);
      return { ...result, logoBase64 };
    } else {
      console.log(`⚠️  Failed to convert logo for ${result.appName} (${result.platform})`);
    }
  }
  return result;
});

// Generate the report
console.log('\n📊 Generating HTML report...');
CustomHtmlReporter.generateReport(
  resultsWithLogos,
  'custom-reports/Unified_App_Verification_Report.html'
);

console.log('✅ Report generated successfully!');

