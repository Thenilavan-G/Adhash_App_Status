require('dotenv').config();
const { execSync } = require('child_process');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('\n🚀 Starting Automated Test & Email Process\n');
console.log('=' .repeat(80));

// Step 1: Run Playwright tests
console.log('\n📋 Step 1: Running Playwright tests...\n');
try {
  execSync('npx playwright test unified.spec.ts --reporter=list', {
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('\n✅ Tests completed successfully');
} catch (error) {
  console.log('\n⚠️  Tests completed with some failures (continuing to send report)');
}

// Step 2: Generate HTML report
console.log('\n📊 Step 2: Generating HTML report...\n');
try {
  execSync('npx tsc generate-report.ts --esModuleInterop --resolveJsonModule', {
    stdio: 'inherit',
    cwd: __dirname
  });
  execSync('node generate-report.js', {
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('✅ Report generated');
} catch (error) {
  console.log('⚠️  Report generation completed');
}

// Step 3: Send email
console.log('\n📧 Step 3: Sending email report...\n');

async function sendEmail() {
  const senderEmail = process.env.SENDER_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  
  if (!senderEmail || !password || !recipientEmail) {
    console.error('❌ Error: Missing email credentials in .env file');
    console.log('\nPlease update .env file with:');
    console.log('SENDER_EMAIL=your_email@adhashtech.com');
    console.log('EMAIL_PASSWORD=your_password');
    console.log('RECIPIENT_EMAIL=recipient@adhashtech.com');
    process.exit(1);
  }
  
  console.log(`   From: ${senderEmail}`);
  console.log(`   To: ${recipientEmail}`);
  
  // Read the HTML report
  const reportPath = path.join(__dirname, 'custom-reports', 'Unified_App_Verification_Report.html');
  
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ Error: Report not found at ${reportPath}`);
    process.exit(1);
  }
  
  const htmlContent = fs.readFileSync(reportPath, 'utf8');
  
  // Create transporter (Gmail)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  // Email options
  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: `📊 Adhash App Status Report - ${new Date().toLocaleDateString()}`,
    html: htmlContent,
    attachments: [
      {
        filename: 'Unified_App_Verification_Report.html',
        path: reportPath
      }
    ]
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('\n✅ Email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log('\n' + '='.repeat(80));
    console.log('🎉 Process completed successfully!');
    console.log('=' .repeat(80) + '\n');
  } catch (error) {
    console.error('\n❌ Error sending email:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your email credentials in .env file');
    console.log('2. Verify your Gmail password/app password is correct');
    console.log('3. For Gmail, you MUST use an app-specific password');
    console.log('4. Generate app password at: https://myaccount.google.com/apppasswords');
    process.exit(1);
  }
}

sendEmail();

