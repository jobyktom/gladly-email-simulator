require('dotenv').config();
const nodemailer = require('nodemailer');
const scenarios = require('./scenarios.json');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmails() {
  for (const sc of scenarios) {
    const from = `"${sc.name}" <${sc.email}>`;
    const mailOptions = {
      from,
      to: process.env.EMAIL_TO,
      subject: sc.subject,
      text: `${sc.body}\n\n(This is a simulated email for training)`
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Sent from ${sc.name}: ${info.messageId}`);
    } catch(err) {
      console.error(`❌ Error from ${sc.name}:`, err);
    }
  }
}

if (require.main === module) {
  sendEmails();
}

module.exports = sendEmails;
