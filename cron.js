require('dotenv').config();
const cron = require('node-cron');
const sendEmails = require('./index');

// Cron: every day at 09:00 local time
cron.schedule('0 9 * * *', async () => {
  console.log('📬 Running daily training email job...');
  await sendEmails();
});
