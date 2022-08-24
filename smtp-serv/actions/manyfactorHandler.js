const https = require('https');

const handler = (emailObject) => {
  const payload = {
    to: emailObject.headers.to,
    from: emailObject.headers.from,
    body: emailObject.text.body,
  };

  const options = {
    hostname: "beta.manyfactor.io",
    port: 443,
    path: "/api/webhooks/incoming-email",
    method: "POST",
    headers: { "content-type": "application/json" },
  };

  const req = https.request(options, (res) => {
    console.log(`Sent the email to Manyfactor. StatusCode: ${res.statusCode}`);
  });

  req.on("error", (error) => {
    console.error(error);
  });
  
  console.log('Sending Email:\n', JSON.stringify(payload, null, 2));
  req.write(JSON.stringify(payload));
  req.end();

  console.log("sending email to manyfactor-serv...");
}

exports.handler = handler;