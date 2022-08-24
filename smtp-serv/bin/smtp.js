/**
 * Simple NodeJS SMTP Server
 * 
 * James Perih <james@hotdang.ca> - 2018-03-01
 * 
 * derrived from content at 
 * https://hd.islandnet.com/view-article/79-pep-smtp-tutorial
 * 
 * and archaic Node SMTP server here:
 * 
 */

const net = require('net');
const parse = require('../lib/parse.js'); // it does magical things to parse email content

// any custom handlers
const handleManyfactorWebhook = require('../actions/manyfactorHandler.js');

const _IP_ADDRESS = '0.0.0.0';                  // listen on all interfaces
const _VALID_DOMAIN = 'manyfactor.io';          // Your domain. It better match the PTR
const _SERVER_NAME  = 'manyfactor.io receiver'; // whatever you call yourself
const _SMTP_PORT = 25;                          // SMTP port. Don't touch
const _PTR_RECORD = '161.ip-66-70-188.net';     // PTR record for the IP address. 
                                                // Yes, required, or google will 
                                                //have a problem sending or receiving
                                                // with you.
const _EOL = '\r\n';                            // EOL = end of line. Don't touch this
                                                // unless it's the future and we don't 
                                                // use \r\n anymore

// Creates an SMTP server
const smtp = (() => {

  // SMTP commands we support, and our responses
  const commands = {
    'OPEN': `220 ${_PTR_RECORD} (${_IP_ADDRESS}) ESMTP ${_SERVER_NAME}`,
    'EHLO': [
      `250-${_IP_ADDRESS} OH HAI <var>`,
      `250-SIZE 52428800`,
      `250-ENHANCEDSTATUSCODES`,
      `250-8BITMIME`,
      // `250-PIPELINING`, // not supported
    ].join(_EOL),
    'HELO': `250 OH HAI <var>`,
    'MAIL': `250 FINE`, // we don't care who you are
    'RCPT': `250 FINE`, // we don't care who you sending to (we have handlers for that)
    'DATA': `354 End data with <CR><LF>.<CR><LF> pretty please`,
    '.': `250 OK id=1778te-0009TT-00`, // in a real world scenario, this would be a message ID
    'QUIT': `221 kthxbai`,
    'NORELAY': `550 As if...`,
  };

  const sendResponse = (socket, command, args) => {
    let response = commands[command];

    if (args) {
      response = response.replace('<var>', args);
    }

    socket.write(`${response}${_EOL}`);
  }

  return {
    sendResponse: sendResponse,
    commands: commands
  };
})(_IP_ADDRESS);

const server = (socket) => {
  let emailMessage = '';
  let timeout; 
  
  // Set encoding
  socket.setEncoding('utf8');

  // New Connection
  socket.addListener('connect', () => {
    smtp.sendResponse(socket, 'OPEN');
  });

    // Incoming Data, part of the SMTP protocol
    socket.addListener('data', (data) => {
      const parts = data.split(/\s|\\r|\\n/);
      const command = parts[0].toUpperCase();
      
      if (smtp.commands[ command ]) { // Check for a command we support
        if (command === 'RCPT') { // oh, did you had someone in particular in mind?
          if (parts[1].includes(`@${_VALID_DOMAIN}`)) { // oh, you mean us? ok.
            smtp.sendResponse(socket, command, parts[1]);
          } else { // we don't handle other people's domains
            smtp.sendResponse(socket, 'NORELAY');
          }
        } else { // must be some other request
          smtp.sendResponse(socket, command, parts[1]);
        }
      } else if (data.substr(-5) == "\r\n.\r\n") { // Check for end of email
        // trimming off those last 5 useless characters you sent intending to end the message
        emailMessage = `${emailMessage}${data.substring(0, data.length - 5)}`;
        smtp.sendResponse(socket, '.');
      } else { // Not a command. Must be the message
        // keep building the message
        emailMessage = `${emailMessage}${data}`;
      }

      // We actually did something!
      // Clear the timeout counter
      clearTimeout(timeout);

      // set a new timeout counter
      timeout = setTimeout(() => {
        smtp.sendResponse(socket, 'MAIL'); 
      }, 10000); // 10 seconds, no longer!
    });

    // Finished
    socket.addListener('close', () => {
      // They left. Let's finish up
      clearTimeout(timeout); // clear the timeout counter
      
      // we have the entire message. Do something with it
      console.log('Message received:', emailMessage);
      let emailObject;

      try {
        emailObject = parse.email(emailMessage);        
      } catch (e) {
        console.log('Error parsing received data', e);
      }

	    // Manyfactor.IO webhook.
      try {
        handleManyfactorWebhook.handler(emailObject);
      } catch (e) {
        console.error('Error with Handler:', e);
      }
    });

    // send initial response
    smtp.sendResponse(socket, 'OPEN');
}

const smtpServer  = net.createServer(server);
console.log('Starting email server');
smtpServer.listen(_SMTP_PORT, _IP_ADDRESS);
