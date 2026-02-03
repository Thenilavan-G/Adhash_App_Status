require('dotenv').config();
const nodemailer = require('nodemailer');

async function verifyZohoSMTP() {
  console.log('\n🔍 Verifying Zoho SMTP Configuration\n');
  console.log('=' .repeat(80));
  
  const senderEmail = process.env.SENDER_EMAIL;
  const password = process.env.EMAIL_PASSWORD;
  
  console.log(`\n📧 Configuration:`);
  console.log(`   Email: ${senderEmail}`);
  console.log(`   Password: ${password ? '***' + password.slice(-4) : 'NOT SET'}`);
  console.log(`   SMTP Server: smtp.zoho.com`);
  console.log(`   Port: 587`);
  
  // Test with different configurations
  const configs = [
    {
      name: 'Config 1: STARTTLS (Port 587)',
      config: {
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: { user: senderEmail, pass: password },
        tls: { rejectUnauthorized: false }
      }
    },
    {
      name: 'Config 2: SSL (Port 465)',
      config: {
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: { user: senderEmail, pass: password },
        tls: { rejectUnauthorized: false }
      }
    }
  ];
  
  for (const { name, config } of configs) {
    console.log(`\n\n🧪 Testing: ${name}`);
    console.log('-'.repeat(80));
    
    const transporter = nodemailer.createTransport(config);
    
    try {
      console.log('   Verifying connection...');
      await transporter.verify();
      console.log('   ✅ Connection successful!');
      
      console.log('   Sending test email...');
      const info = await transporter.sendMail({
        from: senderEmail,
        to: senderEmail, // Send to yourself
        subject: `Test from ${name}`,
        text: `This is a test email sent at ${new Date().toLocaleString()}`,
        html: `<h1>Test Email</h1><p>Sent at: ${new Date().toLocaleString()}</p>`
      });
      
      console.log('   ✅ Email sent successfully!');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Response: ${info.response}`);
      console.log(`\n   ✅ THIS CONFIGURATION WORKS!`);
      console.log(`   Check your inbox: ${senderEmail}`);
      break; // Stop if successful
      
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      if (error.code) console.log(`   Error Code: ${error.code}`);
      if (error.response) console.log(`   Server Response: ${error.response}`);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('\n💡 Troubleshooting Tips:');
  console.log('1. Login to https://mail.zoho.com with your credentials');
  console.log('2. Check if 2FA is enabled - you may need an app password');
  console.log('3. Go to Settings > Security > App Passwords');
  console.log('4. Generate a new app password for "Email Automation"');
  console.log('5. Update .env file with the app password instead');
  console.log('\n');
}

verifyZohoSMTP();

