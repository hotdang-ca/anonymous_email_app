'use strict'

const Encoder = require('../encoders/stringencoder');
const AccountNotExistsError = require('../errors/account-not-exists');

module.exports = function(store, request, response) {
    return new Promise((resolve, reject) => {
        if(request.body.grant_type == 'refresh_token') {
          store.find('credentialtoken', null, {
            match: {
              refresh_token: request.body.refresh_token
            }
          }).then((result) => {
            if(result.payload.records.length) {
              resolve(result.payload.records[0]);
            }
            else {
              reject(new AccountNotExistsError());
            }
          }).catch((error) => {
            reject(error);
          });
        }
        else {
          if(request.body.grant_type == 'password') {
            store.find('credential', null, {
                match: {
                    username: request.body.username,
                    password: Encoder.stringify(request.body.password)
                }
            }).then((result) => {
                if(result.payload.records.length) {
                    let credential = result.payload.records[0];
                    let key = Encoder.stringify(`${credential.id}${Date.now()}`);
                    let access = `${Encoder.stringify(credential.id)}-${key}`;
                    store.create('credentialtoken', [{
                        credential: credential.id,
                        access_token: access,
                        token_type: 'credential',
                        expires_in: 3600,
                        refresh_token: `${Encoder.stringify(key)}-${Encoder.stringify(access)}`,
                        scope: 'create'
                    }]).then((result) => {
                        if(result.payload.records.length) {
                            resolve(result.payload.records[0]);
                        }
                        else {
                            reject(new AccountNotExistsError());
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                }
                else {
                    reject(new AccountNotExistsError());
                }
            }).catch((error) => {
                reject(error);
            });
          }
          else {
            reject(new AccountNotExistsError());
          }
        }
    });
}
