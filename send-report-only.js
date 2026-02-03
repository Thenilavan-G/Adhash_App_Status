require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

console.log('\n📧 Sending Email Report...\n');
console.log('='.repeat(80));

async function sendEmail() {
  const senderEmail = process.env.SENDER_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  
  if (!senderEmail || !password || !recipientEmail) {
    console.error('❌ Error: Missing email credentials in .env file');
    process.exit(1);
  }
  
  console.log(`\n📨 Email Configuration:`);
  console.log(`   From: ${senderEmail}`);
  console.log(`   To: ${recipientEmail}`);
  console.log(`   SMTP: smtp.zoho.com:587\n`);
  
  // Read the HTML report
  const reportPath = path.join(__dirname, 'custom-reports', 'Unified_App_Verification_Report.html');
  
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ Error: Report not found at ${reportPath}`);
    console.log('\n💡 Run this first: node generate-report.js');
    process.exit(1);
  }
  
  const htmlContent = fs.readFileSync(reportPath, 'utf8');
  console.log(`✅ Report loaded: ${reportPath}\n`);
  
  // Create transporter (Zoho)
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
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
  
  console.log('🔌 Verifying SMTP connection...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified\n');
  } catch (error) {
    console.error('❌ SMTP verification failed:', error.message);
    process.exit(1);
  }
  
  // Email options
  const mailOptions = {
    from: `Adhash Automation <${senderEmail}>`,
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
  
  console.log('📤 Sending email...\n');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log('\n' + '='.repeat(80));
    console.log('🎉 Email delivered successfully!');
    console.log('='.repeat(80) + '\n');
  } catch (error) {
    console.error('\n❌ Error sending email:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your email credentials in .env file');
    console.log('2. Verify your Zoho Mail password is correct');
    console.log('3. Make sure you are using the app-specific password');
    process.exit(1);
  }
}

sendEmail();

