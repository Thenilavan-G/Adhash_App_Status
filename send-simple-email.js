require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendSimpleEmail() {
  console.log('\n📧 Sending Simple Email (Plain Text + Attachment)\n');
  
  const senderEmail = 'thenilavan@adhashtech.com';
  const password = 'G8sYN8MRCWpM';
  const recipientEmail = 'thenilavan@adhashtech.com'; // Send to yourself first
  
  console.log(`From: ${senderEmail}`);
  console.log(`To: ${recipientEmail}`);
  
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
  
  // Verify connection
  try {
    await transporter.verify();
    console.log('✅ SMTP verified\n');
  } catch (error) {
    console.error('❌ SMTP failed:', error.message);
    return;
  }
  
  // Check if report exists
  const reportPath = path.join(__dirname, 'custom-reports', 'Unified_App_Verification_Report.html');
  if (!fs.existsSync(reportPath)) {
    console.error('❌ Report not found');
    return;
  }
  
  console.log('Sending email...\n');
  
  try {
    const info = await transporter.sendMail({
      from: `Adhash Bot <${senderEmail}>`,
      to: recipientEmail,
      subject: 'Adhash App Status Report - ' + new Date().toLocaleDateString(),
      text: `
Adhash Application Status Report
Generated: ${new Date().toLocaleString()}

This email contains the automated app verification report.
Please see the attached HTML file for the full report.

--
Adhash Automation Bot
      `,
      attachments: [
        {
          filename: 'App_Status_Report.html',
          path: reportPath
        }
      ]
    });
    
    console.log('✅ EMAIL SENT!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    console.log(`\n📬 Check your email: ${recipientEmail}`);
    console.log(`\nIMPORTANT: Check these folders:`);
    console.log(`  1. Inbox`);
    console.log(`  2. Spam/Junk`);
    console.log(`  3. All Mail`);
    console.log(`  4. Sent folder (to confirm it was sent)`);
    console.log(`\nLogin at: https://mail.zoho.com`);
    
  } catch (error) {
    console.error('❌ Send failed:', error.message);
    console.error(error);
  }
}

sendSimpleEmail();

