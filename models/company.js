const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using Schema instead of mongoose.schema as it will be refered alot

const companySchema = new Schema({


    company_ID: {
        type: Number,
        // required: true,
        min: 1
    },
    company_Name: {
        type: String,

    },
    normal_trial_balance: {
        type: Number,

        default: 0
        // required: true,
        // min: 1
    },
    post_adjustment_trial_balance: {
        type: Number,

        default: 0
        // required: true,
        // min: 1
    },
    post_closing_trial_balance: {
        type: Number,

        default: 0
        // required: true,
        // min: 1
    },
    net_income_from_statment: {
        type: Number,

        default: 0
        // required: true,
        // min: 1
    },
    owner_capital_from_statement: {
        type: Number,
        default: 0
        // required: true,
        // min: 1
    },
    balanace_from_statement: {
        type: Number,
        default: 0
        // required: true,
        // min: 1
    },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]

});

module.exports = mongoose.model('Company', companySchema);
