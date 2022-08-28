`use strict`;
const SHA256 = require('crypto-js/sha256');
module.exports = function(collection, prefix = 10, suffix = 10) {
  let includes = true;
  let identity = null;
  while(includes) {
    let identityPrefix = SHA256(`${(new Date).getTime().toString()}-${Math.random().toString()}`).toString().slice(-prefix);
    let identitySuffix = SHA256(`${(new Date).getTime().toString()}-${Math.random().toString()}`).toString().slice(-suffix);
    identity = `${identityPrefix}-${identitySuffix}`;
    includes = (collection[identity] ? true : false);
  }
  return identity;
}
