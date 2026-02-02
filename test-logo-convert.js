const fs = require('fs');
const path = require('path');

console.log('Testing logo conversion...');

const logoPath = 'test-results/logos/autochecker_playstore.png';
const fullPath = path.join(__dirname, logoPath);

console.log('Full path:', fullPath);
console.log('File exists:', fs.existsSync(fullPath));

if (fs.existsSync(fullPath)) {
  const imageBuffer = fs.readFileSync(fullPath);
  const base64Image = imageBuffer.toString('base64');
  console.log('Base64 length:', base64Image.length);
  console.log('First 100 chars:', base64Image.substring(0, 100));
}

console.log('Done!');

