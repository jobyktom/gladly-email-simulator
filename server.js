require('dotenv').config();
const express = require('express');
const sendEmails = require('./index');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/trigger-emails', async (req, res) => {
  try {
    await sendEmails();
    res.send('✅ Training emails sent.');
  } catch {
    res.status(500).send('❌ Failed to send training emails.');
  }
});

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
