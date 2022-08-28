'use strict'

const Encoder = require('../encoders/stringencoder');
const TokenInvalidError = require('../errors/token-invalid');

module.exports = [
    async (context, record) => {
        switch(record.tokentype) {
            case 'credential':
                await context.transaction.find('credentialtoken', null, {
                    match: {
                        access_token: record.token
                    }
                }).then(async (result) => {
                    if(result.count) {
                        await context.transaction.find('credential', [result[0].credential]).then((result) => {
                            if(result.count) {
                                record.user = result[0].user;
                            }
                            else {
                                throw new TokenInvalidError("Credential not found");
                            }
                        });
                    }
                    else {
                        throw new TokenInvalidError();
                    }
                });
            break;
        }
        return record;
    },
    (context, record) => {
        return record;
    }
]
