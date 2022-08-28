'use strict'

module.exports = [
    (context, record) => {
        return record;
    },
    (context, record, extra) => {
        record.credential = null;
        return record;
    }
]