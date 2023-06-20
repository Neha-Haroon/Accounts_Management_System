const mongoose = require('mongoose');
const entry = require('./entry');
const Schema = mongoose.Schema;
// using Schema instead of mongoose.schema as it will be refered alot

const transactionSchema = new Schema({

    transaction_ID: {
        type: Number,
        required: true,
        min: 1
    },

    debit: {
        type: Number,
        // required: true,
        min: 1
    },
    credit: {
        type: Number,
        // required: true,
        min: 1
    },
    entry_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Entry'
    },
    account_ID: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

});

module.exports = mongoose.model('Transaction', transactionSchema);
