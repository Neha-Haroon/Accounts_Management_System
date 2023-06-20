const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using Schema instead of mongoose.schema as it will be refered alot



const entrySchema = new Schema({
    entry_ID: {
        type: Number,
        min: 1,
        // required: true
    },
    flag: {
        type: String,
        lowercase: true,
        // required: true,
        enum: ['normal', 'adjustment', 'closing']
    },
    date: {
        type: Date

    },
    account_name: {
        type: String
    },
    debit: {
        type: Number,
        // required: true,
        // min: 1
    },
    credit: {
        type: Number,
        // required: true,
        // min: 1
    }
});

module.exports = mongoose.model('Entry', entrySchema);
