require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendEmail() {
  console.log('\n📧 Sending Email Report...\n');

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
  
  console.log('\n📤 Sending email...\n');
  
  // Read the HTML report
  const reportPath = path.join(__dirname, 'custom-reports', 'Unified_App_Verification_Report.html');
  const htmlContent = fs.readFileSync(reportPath, 'utf8');
  
  // Create transporter
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
  
  // Email options
  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: '📊 Adhash App Status Report - Local Run',
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
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
  }
}

sendEmail();

