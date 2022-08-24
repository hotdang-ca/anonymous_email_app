# Simple SMTP Server in NodeJS

## Getting started
1.  Specify values for the required constants:
    | Constant | Description |
    | -- | -- |
    | `_IP_ADDRESS` | The IP address your smtp listens on. Likely your public IP address (so long as your gateway will direct incoming traffic to this instance) |
    | `_SMTP_PORT` | The port the net socket will listen on. Should always be 25. | 
    | `_SERVER_NAME` | What clients should call you. | 
    | `_PTR_RECORD` | `2020-11-06:` Required for modern communications; a valid PTR record for your IP to denote you are legitimate |
    | `_VALID_DOMAIN` | `2020-11-06:` Required for modern communications; the domain your SMTP accepts email on (gmail ***never*** send to open  relays) |
1.  Set up any handlers for the parsed message you want.
1.  Run the server:
    ```bash
    $ node bin/smtp.js
    ```
1.  Send an email to any user at the domain you are listening to.

## Notice
This SMTP server is under development. Right now it only accepts email.

Sending email, or TLS, is out of scope of this project

## License
Copyright 2018 James Robert Perih

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.