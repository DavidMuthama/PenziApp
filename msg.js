const dotenv=require('dotenv')
const twilio=require('twilio')
const result = dotenv.config();
const express = require('express');
const app = express()
const port = 3838

app.get('/twilio', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    sendSMS("+254729741134","I love this app")
})

if (result.error) {
  throw result.error;
}

// function formatMessage(user, messageText) {
//   return `Message from ${user}: ${messageText}`;
// };

function sendSMS(to, message) {
  var client = new twilio(process.env.accountSID, process.env.authToken);
  return client.api.messages
    .create({
      body: message,
      to: to,
      from: "+12513124093",
    }).then(function (data) {
      console.log(data);
    }).catch(function (err) {
      console.error('Could not create successfully');
      console.error(err);
    });
};