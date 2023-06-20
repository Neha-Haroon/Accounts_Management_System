const mongoose = require('mongoose')

// importing models -
const Entry = require("./models/entry");
const Account = require("./models/account");
const Company = require("./models/company");


mongoose.connect('mongodb://127.0.0.1:27017/AccountsCycle').then(() => {
    console.log("Mongoose connected:true");
})
    .catch((err) => {
        console.log(err)
    })

// const a = new Account({
//     account_ID: 15,
//     account_Name: 'Hotel Land',
//     major_head: 'asset',
//     initial_Debited_Amount: 50000,
//     initial_Credited_Amount: 45000

// })
// a.save().then(a => {
//     console.log(a)
// }).catch(e => {
//     console.log(e)
// })



// const a = new Company({
//     company_ID: 15,
//     company_Name: 'Apple',

// })
// a.save().then(a => {
//     console.log(a)
// }).catch(e => {
//     console.log(e)
// })

const income_summary = new Account({
    account_ID: 55,
    account_Name: 'income summary',
    company_name: 'state service company',
    major_head: 'income summary',
    initial_Debited_Amount: 0,
    initial_Credited_Amount: 0,
    sum_Debited_Amount: 0,
    sum_Credited_Amount: 0,
    isActive: 'true'
})
income_summary.save().then(income_summary => {
    console.log(income_summary)
}).catch(e => {
    console.log(e)
})



// const genralJournal = [{

//     entry_Num: 1,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     debit: 45000

// }, {
//     entry_Num: 1,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 201,
//     account_Name: 'Note payable',
//     credit: 45000

// }, {
//     entry_Num: 2,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 102,
//     account_Name: 'Land',
//     debit: 40000

// }, {
//     entry_Num: 2,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 40000


// }, {
//     entry_Num: 3,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     debit: 5000

// }, {
//     entry_Num: 3,
//     flag: 'normal',
//     major_head: 'revenue',
//     account_ID: 501,
//     account_Name: 'Service Revenue',
//     credit: 5000


// }, {
//     entry_Num: 4,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 103,
//     account_Name: 'Supplies',
//     debit: 300

// }, {
//     entry_Num: 4,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 202,
//     account_Name: 'Account Payable',
//     credit: 300


// }, {
//     entry_Num: 5,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 203,
//     account_Name: 'Account Revievable',
//     debit: 2600

// }, {
//     entry_Num: 5,
//     flag: 'normal',
//     major_head: 'revenue',
//     account_ID: 502,
//     account_Name: 'Service Revenue',
//     credit: 2600


// }, {
//     entry_Num: 6,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 202,
//     account_Name: 'Account Payable',
//     debit: 1200

// }, {
//     entry_Num: 6,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 1200


// }, {
//     entry_Num: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 601,
//     account_Name: 'Salaries Expense',
//     debit: 3000

// }, {
//     entry_Num: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 602,
//     account_Name: 'Rent Expense',
//     debit: 1500

// }, {
//     entry_Num: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 603,
//     account_Name: 'Interst Expense',
//     debit: 400

// }, {
//     entry_Num: 7,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 4900


// }, {
//     entry_Num: 8,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     debit: 3100

// }, {
//     entry_Num: 8,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 203,
//     account_Name: 'Account Recievable',
//     credit: 3100


// }, {
//     entry_Num: 9,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 604,
//     account_Name: 'Utilites Expense',
//     debit: 200

// }, {
//     entry_Num: 9,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 502,
//     account_Name: 'Account Payable',
//     credit: 200


// }, {
//     entry_Num: 10,
//     flag: 'normal',
//     major_head: 'ownerwithdrawl',
//     account_ID: 401,
//     account_Name: 'Owner Withdrawl',
//     debit: 1800

// }, {
//     entry_Num: 10,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 1800


// }]

// Account.insertMany(genralJournal)
//     .then(a => {
//         console.log(a)
//     }).catch(e => {
//         console.log(e)
//     })

// CREATE ACCOUNT
// CREATE TRANSACTION
// CREATE ENTRY

// const accounts = [
//     {
//         account_ID: 101,
//         account_Name: "cash",
//         major_head: "asset"
//     }, {
//         account_ID: 102,
//         account_Name: "land",
//         major_head: "asset"
//     }, {
//         account_ID: 103,
//         account_Name: "supplies",
//         major_head: "asset"
//     },
// ]


// Account.insertMany(accounts)
//     .then(a => {
//         console.log(accounts)
//     }).catch(e => {
//         console.log(e)
//     })

// const transactions = [
//     {
//         transaction_ID: 1,
//         debited_Amount: 45000,
//         entry_ID: 1,
//         account_ID: 101
//     }, {
//         transaction_ID: 2,
//         credited_Amount: 45000,
//         entry_ID: 1,
//         account_ID: 201
//     }, {
//         transaction_ID: 3,
//         credited_Amount: 40000,
//         entry_ID: 2,
//         account_ID: 102
//     },
// ]

// Transaction.insertMany(transactions)
//     .then(a => {
//         console.log(transactions)
//     }).catch(e => {
//         console.log(e)
//     })

// const entries = [
//     {
//         entry_ID: 1,
//         flag: 'normal',
//         transactions: [{ transaction_ID: 1 }
//         ]
//     }
// ]

// Entry.insertMany(entries)
//     .then(a => {
//         console.log(entries)
//     }).catch(e => {
//         console.log(e)
//     })
// const genralJournal = [{

//     entry_ID: 1,
//     flag: 'normal',
//     transactions: [{ transaction_ID: 1 },
//     { debited_Amount: 45000 },
//     { credited_Amount: 45000 },
//     { entry_ID: 1 },
//     { account_ID: 101 }
//     ]

// }, {
//     entry_ID: 1,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 201,
//     account_Name: 'Note payable',
//     credit: 45000

// }, {
//     entry_ID: 2,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 102,
//     account_Name: 'Land',
//     debit: 40000

// }, {
//     entry_ID: 2,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 40000


// }, {
//     entry_ID: 3,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     debit: 5000

// }, {
//     entry_ID: 3,
//     flag: 'normal',
//     major_head: 'revenue',
//     account_ID: 501,
//     account_Name: 'Service Revenue',
//     credit: 5000


// }, {
//     entry_ID: 4,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 103,
//     account_Name: 'Supplies',
//     debit: 300

// }, {
//     entry_ID: 4,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 202,
//     account_Name: 'Account Payable',
//     credit: 300


// }, {
//     entry_ID: 5,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 203,
//     account_Name: 'Account Revievable',
//     debit: 2600

// }, {
//     entry_ID: 5,
//     flag: 'normal',
//     major_head: 'revenue',
//     account_ID: 502,
//     account_Name: 'Service Revenue',
//     credit: 2600


// }, {
//     entry_ID: 6,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 202,
//     account_Name: 'Account Payable',
//     debit: 1200

// }, {
//     entry_ID: 6,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 1200


// }, {
//     entry_ID: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 601,
//     account_Name: 'Salaries Expense',
//     debit: 3000

// }, {
//     entry_ID: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 602,
//     account_Name: 'Rent Expense',
//     debit: 1500

// }, {
//     entry_ID: 7,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 603,
//     account_Name: 'Interst Expense',
//     debit: 400

// }, {
//     entry_ID: 7,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 4900


// }, {
//     entry_ID: 8,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     debit: 3100

// }, {
//     entry_ID: 8,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 203,
//     account_Name: 'Account Recievable',
//     credit: 3100


// }, {
//     entry_ID: 9,
//     flag: 'normal',
//     major_head: 'expense',
//     account_ID: 604,
//     account_Name: 'Utilites Expense',
//     debit: 200

// }, {
//     entry_ID: 9,
//     flag: 'normal',
//     major_head: 'liability',
//     account_ID: 502,
//     account_Name: 'Account Payable',
//     credit: 200


// }, {
//     entry_ID: 10,
//     flag: 'normal',
//     major_head: 'ownerwithdrawl',
//     account_ID: 401,
//     account_Name: 'Owner Withdrawl',
//     debit: 1800

// }, {
//     entry_ID: 10,
//     flag: 'normal',
//     major_head: 'asset',
//     account_ID: 101,
//     account_Name: 'Cash',
//     credit: 1800


// }
// ]

// Entry.insertMany(genralJournal)
//     .then(a => {
//         console.log(a)
//     }).catch(e => {
//         console.log(e)
//     })



