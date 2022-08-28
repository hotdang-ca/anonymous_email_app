'use strict'

const Encoder = require('../encoders/stringencoder');
const AccountExistsError = require('../errors/account-exists');

module.exports = [
    async (context, record) => {
        await context.transaction.find('credential', null, {
            match: {
                username: record.username
            }
        }).then((result) => {;
            if(result.length) {
                throw new AccountExistsError();
            }
        });
        record.password = Encoder.stringify(record.password);
        record.encoding = Encoder.encoding;
        return record;
    },
    (context, record) => {
        record.password = null;
        return record;
    }
]