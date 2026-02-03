require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function testAndSendEmail() {
  console.log('\n🔍 Testing Zoho Email Configuration\n');
  console.log('=' .repeat(80));
  
  const senderEmail = process.env.SENDER_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  const recipientEmail = process.env.RECIPIENT_EMAIL;
  
  console.log(`\n📧 Email Configuration:`);
  console.log(`   Sender: ${senderEmail}`);
  console.log(`   Recipient: ${recipientEmail}`);
  console.log(`   Password: ${password ? '***' + password.slice(-4) : 'NOT SET'}`);
  console.log(`   SMTP Server: smtp.zoho.com`);
  console.log(`   Port: 587 (STARTTLS)`);
  
  if (!senderEmail || !password || !recipientEmail) {
    console.error('\n❌ Error: Missing credentials in .env file');
    process.exit(1);
  }
  
  // Create transporter with detailed logging
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: senderEmail,
      pass: password
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    debug: true, // Enable debug output
    logger: true // Log to console
  });
  
  // Test connection
  console.log('\n🔌 Testing SMTP connection...\n');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    console.error('\nFull error:', error);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Verify your Zoho Mail password is correct');
    console.log('2. Try logging into https://mail.zoho.com with these credentials');
    console.log('3. Check if 2FA is enabled - you may need an app-specific password');
    console.log('4. Ensure SMTP access is enabled in Zoho Mail settings');
    process.exit(1);
  }
  
  // Read the HTML report
  const reportPath = path.join(__dirname, 'custom-reports', 'Unified_App_Verification_Report.html');
  
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ Report not found: ${reportPath}`);
    process.exit(1);
  }
  
  const htmlContent = fs.readFileSync(reportPath, 'utf8');
  console.log(`✅ Report loaded: ${reportPath}\n`);
  
  // Email options
  const mailOptions = {
    from: `"Adhash App Status Bot" <${senderEmail}>`,
    to: recipientEmail,
    subject: `📊 Adhash App Status Report - ${new Date().toLocaleString()}`,
    html: htmlContent,
    attachments: [
      {
        filename: 'Unified_App_Verification_Report.html',
        path: reportPath
      }
    ]
  };
  
  // Send email
  console.log('📤 Sending email...\n');
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('\n' + '='.repeat(80));
    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('=' .repeat(80));
    console.log(`\n📧 Email Details:`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log(`   From: ${senderEmail}`);
    console.log(`   To: ${recipientEmail}`);
    console.log(`   Subject: ${mailOptions.subject}`);
    console.log(`\n✅ Check your inbox at: ${recipientEmail}`);
    console.log('=' .repeat(80) + '\n');
  } catch (error) {
    console.error('\n❌ Failed to send email:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

testAndSendEmail();

