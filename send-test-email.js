require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  console.log('\n📧 Sending Test Email to BOTH addresses...\n');
  
  const senderEmail = process.env.SENDER_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  
  console.log(`Sender: ${senderEmail}`);
  console.log(`Recipients: ${senderEmail} AND qateam@adhashtech.com\n`);
  
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
    },
    debug: false,
    logger: false
  });
  
  // Test connection first
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified\n');
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return;
  }
  
  // Send to both emails
  const recipients = `${senderEmail}, qateam@adhashtech.com`;
  
  const mailOptions = {
    from: `"Adhash Test" <${senderEmail}>`,
    to: recipients,
    subject: '🧪 TEST EMAIL - Adhash App Status',
    html: `
      <h1>Test Email</h1>
      <p>This is a test email to verify email delivery is working.</p>
      <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>From:</strong> ${senderEmail}</p>
      <p><strong>To:</strong> ${recipients}</p>
      <hr>
      <p>If you receive this, email delivery is working correctly!</p>
    `
  };
  
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`   Response: ${info.response}`);
    console.log(`\n📬 Check BOTH inboxes:`);
    console.log(`   1. ${senderEmail}`);
    console.log(`   2. qateam@adhashtech.com`);
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
}

sendTestEmail();

