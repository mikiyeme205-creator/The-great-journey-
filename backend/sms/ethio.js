const fetch = require('node-fetch');

module.exports = async function sendSMS(phone, message) {
  const res = await fetch(process.env.ETHIO_SMS_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${process.env.ETHIO_SMS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: phone,
      message
    })
  });

  return res.json();
};
