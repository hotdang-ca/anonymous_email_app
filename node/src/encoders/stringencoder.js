'use strict'

const CryptoJS = require('crypto-js');
const {createHmac} = require('crypto');

function toHash(value) {
    let hash = null;
    switch(process.env.ENCRYPTION_CYPHER) {
        case "HmacSHA1":
          hash = CryptoJS.HmacSHA1(value, process.env.ENCRYPTION_KEY);
          break;
        default:
          throw new Error("ENCRYPTION_CYPHER not recognized");
          break;
    }
    return hash;
}
function toString(value) {
    return toHash(value).toString();
}
function encrypt(value, passphrase) {
  return CryptoJS.AES.encrypt(value, passphrase).toString();
}
function decrypt(value, passphrase) {
  return Buffer.from(CryptoJS.AES.decrypt(value, passphrase).toString(), 'hex').toString();
}
module.exports = {
    encoding: process.env.ENCRYPTION_CYPHER,
    hash: toHash,
    stringify: toString,
    encrypt: encrypt,
    decrypt: decrypt
}
