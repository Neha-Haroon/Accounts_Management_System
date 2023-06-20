const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using Schema instead of mongoose.schema as it will be refered alot

const accountSchema = new Schema({


    account_ID: {
        type: Number,
        // required: true,
        min: 1
    },
    account_Name: {
        type: String,

    },
    major_head: {
        type: String,
        lowercase: true,
        enum: ['asset', 'liability', 'ownercapital', 'ownerwithdrawl', 'revenue', 'expense', 'income summary']
    },
    company_name: {
        type: String
    },
    initial_Debited_Amount: {
        type: Number,
        default: 0
    },
    initial_Credited_Amount: {
        type: Number,
        default: 0
    },
    sum_Debited_Amount: {
        type: Number,

        default: 0
        // required: true,
        // min: 1
    },
    sum_Credited_Amount: {
        type: Number,
        default: 0
        // required: true,
        // min: 1
    },
    entries: [{
        type: Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    isActive: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Account', accountSchema);
