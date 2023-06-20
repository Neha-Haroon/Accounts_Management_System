const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const ejsLint = require('ejs-lint');

const methodOverride = require('method-override')

const app = express();

// importing models -
const Account = require("./models/account");
const Entry = require("./models/entry");
const Company = require("./models/company");
const account = require('./models/account');
const entry = require('./models/entry');
const { status } = require('express/lib/response');
require("./models/mongooseConnection")

// telling express to parse the code
app.use(express.urlencoded({ extended: true }));
// for diffent types of requests customization
app.use(methodOverride('_method'));

// setting the views directory
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')))
// ======================== A L L   R O U T E S ========================
// HOME PAGE
app.get('/', async (req, res) => {
    const Accounts = await Account.find({})
    res.render('accounts/show', { Accounts })
})

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ C O M P A N I E S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

/// =================================== n e w    C o m p n a n i e s===================================

// New Company

app.get('/companies/new', async (req, res) => {
    res.render('companies/new')
})
app.post('/companies', async (req, res) => {
    const newCompany = new Company(req.body);
    newCompany.normal_trial_balance = 0;
    newCompany.post_adjustment_trial_balance = 0;
    newCompany.post_closing_trial_balance = 0;
    newCompany.net_income_from_statment = 0;
    newCompany.owner_capital_from_statement = 0;
    newCompany.balanace_from_statment = 0;
    await newCompany.save();
    console.log(newCompany);

    res.redirect(`/companies/${ newCompany._id }`)
})
app.post('/companies/:id/accounts', async (req, res) => {
    const company = await Company.findById(req.params.id); // find the company by id
    const account = new Account(req.body.account);  // make a new  independent account

    account.company_name = company.company_Name;

    account.sum_Debited_Amount += account.initial_Debited_Amount;
    account.sum_Credited_Amount += account.initial_Credited_Amount;
    account.isActive = true;

    company.accounts.push(account); // attaches the entry to found account 
    await account.save();
    await company.save();
    console.log(company);
    console.log(account);

    // res.render('accounts/singleshow', { account, flags })
    res.redirect(`/companies/${ company._id }`)

    // const entries = await Entry.find({})
    // res.render('entries/show', { entries, flag })
})

// =================================== s h o w   C o m p n a n i e s ===================================
// SHOW COMPANies
app.get('/companies', async (req, res) => {
    const Companies = await Company.find({})
    console.log(Companies)
    res.render('companies/show', { Companies })
})

// DISPLAY SINGLE COMPANY


app.get('/companies/:id', async (req, res) => {
    const major_heads = ['asset', 'liability', 'ownercapital', 'ownerwithdrawl', 'revenue', 'expense']
    const { id } = req.params;
    const company = await Company.findById(id);
    const accounts = await Account.find();
    console.log(company);
    // res.send("All PRODUCTS WILL BE HERE");
    res.render('companies/singleshow', { company, major_heads, accounts })
})
// =================================== u p d a t e    C o m p n a n i e s===================================
// post net income
// app.put('companies/:id/net_income', async (req, res) => {
//     const { id } = req.params;
//     const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     console.log(req.body)
//     res.redirect(`/companies/${ updatedCompany._id }`)

// })


// EDIT COMPANY

app.get('/companies/:id/edit', async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id)
    console.log(company);
    res.render('companies/edit', { company, major_heads })
})



app.put('/companies/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    // console.log(req.body)
    res.redirect(`/companies/${ updatedCompany._id }`)
})
// =================================== c l o s e    C o m p n a n i e s===================================

// =================================== d e l e t e     C o m p n a n i e s===================================
// DELETE COMPANY

app.delete('/companies/:id', async (req, res) => {
    const { id } = req.params;

    // first find the account
    let company = await Company.findById(id)
    let company_name = company.account_Name

    console.log(company, company_name)

    // first find and delete all the accounts of that account
    let accounts = await Account.find({ company_name });
    // for (accounts of company.entries) {
    // if (entry.account_name === account.account_Name) {
    console.log('deleted accounts :', accounts)
    // }
    await Account.deleteMany({ company_name });
    // }


    const deletedCompany = await Company.findByIdAndDelete(id);
    res.redirect('/companies');
})












//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ A C C O U N T S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// SEARCH BY MAJOR HEAD
app.get('/accounts', async (req, res) => {
    const { major_head } = req.query;
    if (major_head) {
        const accounts = await Account.find({ major_head })
        res.render('accounts/filtershow', { accounts, major_head })
    } else {
        const accounts = await Account.find({})
        res.render('accounts/filtershow', { accounts, major_head: 'All' })
    }
})
/// =================================== n e w   a c c o u n t s ===================================

// New Account

app.get('/accounts/new', async (req, res) => {
    const major_heads = ['asset', 'liability', 'ownercapital', 'ownerwithdrawl', 'revenue', 'expense']
    const companies = await Company.find({})

    // const Accounts = await Account.find({})
    res.render('accounts/new', { major_heads, companies })
})
app.post('/accounts', async (req, res) => {
    const newAccount = new Account(req.body);
    newAccount.sum_Debited_Amount = newAccount.initial_Debited_Amount;
    newAccount.sum_Credited_Amount = newAccount.initial_Credited_Amount;
    newAccount.isActive = true;

    await newAccount.save();
    console.log(newAccount);


    // to insert the account into the company
    const company_Name = newAccount.company_name;
    const company = await Company.findOne({ company_Name });

    console.log(company);
    company.accounts.push(newAccount);// attaches the account to found account 
    await company.save();

    // const Accounts = await Account.find({})
    res.redirect(`/accounts/${ newAccount._id }`)
})
// =================================== s h o w   a c c o u n t s ===================================
// SHOW ACCOUNTS
app.get('/accounts', async (req, res) => {
    const Accounts = await Account.find({})
    res.render('accounts/show', { Accounts })
})

// DISPLAY SINGLE ENTRY


app.get('/accounts/:id', async (req, res) => {
    const flags = ['normal', 'adjustment', 'closing']
    const { id } = req.params;
    const account = await Account.findById(id);
    const entries = await Entry.find();
    console.log(account);
    // res.send("All PRODUCTS WILL BE HERE");
    res.render('accounts/singleshow', { account, flags, entries })
})
// =================================== u p d a t e   a c c o u n t s ===================================
// EDIT ACCOUNTS


app.get('/accounts/:id/edit', async (req, res) => {
    const { id } = req.params;
    const account = await Account.findById(id)
    console.log(account);
    res.render('accounts/edit', { account, major_heads })
})

app.put('/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const { initial_Debited_Amount } = req.params;
    const { initial_Credited_Amount } = req.params;

    let new_initial_Debited_Amount = initial_Debited_Amount;
    let new_initial_Credited_Amount = initial_Credited_Amount;

    const olderAccount = await Account.findById(id);
    // const updatedAccount = await Account.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });

    // UPDATE THE SUMS TOO
    // first find  the older debit and credit from sum credit and debit

    let olderAccountSumDebitWithoutInitial = olderAccount.sum_Debited_Amount - olderAccount.initial_Debited_Amount;
    let olderAccountSumCreditWithoutInitial = olderAccount.sum_Credited_Amount - olderAccount.initial_Credited_Amount;

    let UpdatedAccountSumDebitWithInitial = olderAccountSumDebitWithoutInitial + new_initial_Debited_Amount;
    let UpdatedAccountSumCreditWithInitial = olderAccountSumCreditWithoutInitial + new_initial_Credited_Amount;

    // then insert the new debit and credit from sum debit and credit

    const updatedAccount = await Account.updateOne({ id },
        {
            $set:
            {
                sum_Debited_Amount: UpdatedAccountSumDebitWithInitial,
                sum_Credited_Amount: UpdatedAccountSumCreditWithInitial
            }
        })

    // save account
    await account.updateOne();



    // console.log(req.body)
    res.redirect(`/accounts/${ updatedAccount._id }`)
})

// =================================== c l o s e   a c c o u n t s ===================================

// 1. create an income summary account if does not exists
// 2.  if revenue account -> debit balance into income summary -> mark r acc as closed
// 3. if expense account -> credit balance into income summary -> mark r acc as closed
// 4. if income summary -> debit balance into owner capital -> mark r acc as closed
// 5. if  withdrawl account -> credit balance into owner capital  -> mark r acc as closed
// 6. if permenant account
// 7. redirect to r / e / w  account
app.put('/accounts/:id/close', async (req, res) => {
    const account = await Account.findById(req.params.id); //find the r / e / w account

    const account_Name = account.account_Name;
    const company_Name = account.company_name;
    const company = await Company.find({ company_Name }) // find company

    let account_balance = 0;

    // 1.
    const income_summaryAcc = await Account.findOne({ major_head: 'income summary' })
    const ownerwithdrawlAcc = await Account.findOne({ major_head: 'ownerwithdrawl' })
    const ownercapitalAcc = await Account.findOne({ major_head: 'ownercapital' })
    console.log('income_summary ; ', income_summaryAcc)

    let income_summary_sum_debit = 0
    let income_summary_sum_credit = 0
    let account_sum_debit = account.sum_Debited_Amount
    let account_sum_credit = account.sum_Credited_Amount
    console.log('initial account_sum_debit :', account_sum_debit, 'account_sum_credit : ', account_sum_credit, ' income_summary_sum_debit : ', income_summary_sum_debit, 'income_summary_sum_credit', income_summary_sum_credit, 'account_balance : ', account_balance)


    // 2.  find balance -> add it on accounts debit side through entry, update isActive as false
    // -> make entry into income summary of balance amount at credit side
    if (account.major_head === 'revenue') {

        account_balance = account.sum_Credited_Amount - account.sum_Debited_Amount;

        // // entry for temporary account 
        const accountEntry = new Entry({
            entry_ID: 55,
            account_name: account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: account_balance,
            credit: 0,
        });  // make a new  independent entry

        account.sum_Debited_Amount += accountEntry.debit;
        account.sum_Credited_Amount += accountEntry.credit;
        account.isActive = false;
        // account_sum_debit += account_balance;
        // income_summary_sum_credit += account_balance

        account.entries.push(accountEntry); // attaches the entry to found account
        await accountEntry.save();
        await account.save();

        console.log("ENTRY : ", accountEntry)

        // // entry for income summary account
        const incomeSummaryEntry = new Entry({
            entry_ID: 55,
            account_name: income_summaryAcc.account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: 0,
            credit: account_balance,
        });  // make a new  independent entry

        income_summaryAcc.sum_Debited_Amount += incomeSummaryEntry.debit;
        income_summaryAcc.sum_Credited_Amount += incomeSummaryEntry.credit;
        // account.isActive = false;

        income_summaryAcc.entries.push(incomeSummaryEntry)// attaches the entry to found account
        await incomeSummaryEntry.save();
        await income_summaryAcc.save();

        console.log("ENTRY : ", incomeSummaryEntry)


        // console.log('....')
        // console.log('final account_sum_debit :', account_sum_debit, 'account_sum_credit : ', account_sum_credit, ' income_summary_sum_debit : ', income_summary_sum_debit, 'income_summary_sum_credit', income_summary_sum_credit, 'account_balance : ', account_balance)
        // res.send('done closing ');

    }
    // 3. find balance -> add it on accounts debit side through entry, update isActive as false
    // -> make entry into income summary of balance amount at credit side

    else if (account.major_head === 'expense') {
        account_balance = account.sum_Debited_Amount - account.sum_Credited_Amount;

        // // entry for temporary account 
        const accountEntry = new Entry({
            entry_ID: 55,
            account_name: account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: 0,
            credit: account_balance,
        });  // make a new  independent entry

        account.sum_Debited_Amount += accountEntry.debit;
        account.sum_Credited_Amount += accountEntry.credit;
        account.isActive = false;
        // account_sum_debit += account_balance;
        // income_summary_sum_credit += account_balance

        account.entries.push(accountEntry); // attaches the entry to found account
        await accountEntry.save();
        await account.save();

        console.log("ENTRY : ", accountEntry)

        // // entry for income summary account
        const incomeSummaryEntry = new Entry({
            entry_ID: 55,
            account_name: income_summaryAcc.account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: account_balance,
            credit: 0,
        });  // make a new  independent entry

        income_summaryAcc.sum_Debited_Amount += incomeSummaryEntry.debit;
        income_summaryAcc.sum_Credited_Amount += incomeSummaryEntry.credit;
        // account.isActive = false;

        income_summaryAcc.entries.push(incomeSummaryEntry)// attaches the entry to found account
        await incomeSummaryEntry.save();
        await income_summaryAcc.save();

        console.log("ENTRY : ", incomeSummaryEntry)


        // console.log('....')
        // console.log('final account_sum_debit :', account_sum_debit, 'account_sum_credit : ', account_sum_credit, ' income_summary_sum_debit : ', income_summary_sum_debit, 'income_summary_sum_credit', income_summary_sum_credit, 'account_balance : ', account_balance)
        // res.send('done closing ');

    }
    // 4. find balance -> add it on accounts debit side through entry, update isActive as false
    // -> make entry into income summary of balance amount at credit side

    else if (account.major_head === 'income summary') {
        account_balance = income_summaryAcc.sum_Credited_Amount - income_summaryAcc.sum_Debited_Amount;

        // // entry for temporary account 
        const accountEntry = new Entry({
            entry_ID: 55,
            account_name: income_summaryAcc.account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: account_balance,
            credit: 0,
        });  // make a new  independent entry

        income_summaryAcc.sum_Debited_Amount += accountEntry.debit;
        income_summaryAcc.sum_Credited_Amount += accountEntry.credit;
        income_summaryAcc.isActive = false;
        // account_sum_debit += account_balance;
        // income_summary_sum_credit += account_balance

        income_summaryAcc.entries.push(accountEntry); // attaches the entry to found account
        await accountEntry.save();
        await income_summaryAcc.save();

        console.log("ENTRY : ", accountEntry)

        // // entry for income summary account
        const ownercapitalEntry = new Entry({
            entry_ID: 55,
            account_name: ownercapitalAcc.account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: 0,
            credit: account_balance,
        });  // make a new  independent entry

        ownercapitalAcc.sum_Debited_Amount += ownercapitalEntry.debit;
        ownercapitalAcc.sum_Credited_Amount += ownercapitalEntry.credit;
        account.isActive = false;

        ownercapitalAcc.entries.push(ownercapitalEntry)// attaches the entry to found account
        await ownercapitalEntry.save();
        await ownercapitalAcc.save();

        console.log("ENTRY : ", ownercapitalEntry)


        // console.log('....')
        // console.log('final account_sum_debit :', account_sum_debit, 'account_sum_credit : ', account_sum_credit, ' income_summary_sum_debit : ', income_summary_sum_debit, 'income_summary_sum_credit', income_summary_sum_credit, 'account_balance : ', account_balance)
        // res.send('done closing ');


    }
    // 5.
    else if (account.major_head === 'ownerwithdrawl') {

        account_balance = account.sum_Debited_Amount - account.sum_Credited_Amount;

        // // entry for temporary account 
        const accountEntry = new Entry({
            entry_ID: 55,
            account_name: account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: 0,
            credit: account_balance,
        });  // make a new  independent entry

        ownerwithdrawlAcc.sum_Debited_Amount += accountEntry.debit;
        ownerwithdrawlAcc.sum_Credited_Amount += accountEntry.credit;
        ownerwithdrawlAcc.isActive = false;
        // account_sum_debit += account_balance;
        // income_summary_sum_credit += account_balance

        ownerwithdrawlAcc.entries.push(accountEntry); // attaches the entry to found account
        await accountEntry.save();
        await ownerwithdrawlAcc.save();

        console.log("ENTRY : ", accountEntry)

        // // entry for income summary account
        const ownercapitalEntry = new Entry({
            entry_ID: 55,
            account_name: income_summaryAcc.account_Name,
            company_name: company_Name,
            flag: 'closing',
            debit: account_balance,
            credit: 0,
        });  // make a new  independent entry

        ownercapitalAcc.sum_Debited_Amount += ownercapitalEntry.debit;
        ownercapitalAcc.sum_Credited_Amount += ownercapitalEntry.credit;
        // account.isActive = false;

        ownercapitalAcc.entries.push(ownercapitalEntry)// attaches the entry to found account
        await ownercapitalEntry.save();
        await ownercapitalAcc.save();

        console.log("ENTRY : ", ownercapitalEntry)
        account.isActive = false;


        // console.log('....')
        // console.log('final account_sum_debit :', account_sum_debit, 'account_sum_credit : ', account_sum_credit, ' income_summary_sum_debit : ', income_summary_sum_debit, 'income_summary_sum_credit', income_summary_sum_credit, 'account_balance : ', account_balance)
        // res.send('done closing ');

    }
    // 6.
    else {
        prompt("is a permanent account it cant be closed")
    }
    // 7.
    res.redirect(`/accounts/${ account._id }`)
    // redirect('/accounts.');
    // res.redirect(`/accounts/${ account. }`)

})

// =================================== d e l e t e    a c c o u n t s ===================================
// DELETE ACCOUNTS

app.delete('/accounts/:id', async (req, res) => {
    const { id } = req.params;

    // first find the account
    let account = await Account.findById(id)
    let account_name = account.account_Name

    console.log(account, account_name)

    // first find and delete all the entries of that account
    let entries = await Entry.find({ account_name });
    // for (entry of account.entries) {
    // if (entry.account_name === account.account_Name) {
    console.log('deleted entry :', entries)
    // }
    await Entry.deleteMany({ account_name });
    // }


    const deletedAccount = await Account.findByIdAndDelete(id);
    res.redirect('/accounts');
})








//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ E N T R I E S @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// =================================== a d d  e n t r i e s===================================
// NEW ENTRY 
const flags = ['normal', 'adjustment', 'closing']
const major_heads = ['asset', 'liability', 'ownercapital', 'ownerwithdrawl', 'revenue', 'expense']



app.get('/entries/new', async (req, res) => {
    const accounts = await Account.find({})
    res.render('entries/new', { Entry, flags, accounts })
})

app.post('/accounts/:id/entries', async (req, res) => {
    const account = await Account.findById(req.params.id); // find the account by id
    const entry = new Entry(req.body.entry);  // make a new  independent entry

    entry.account_name = account.account_Name;

    account.sum_Debited_Amount += entry.debit;
    account.sum_Credited_Amount += entry.credit;

    account.entries.push(entry); // attaches the entry to found account 
    await entry.save();
    await account.save();
    console.log(entry);
    console.log(account);

    // res.render('accounts/singleshow', { account, flags })
    res.redirect(`/accounts/${ account._id }`)

    // const entries = await Entry.find({})
    // res.render('entries/show', { entries, flag })
})

app.post('/entries', async (req, res) => {
    const entry = new Entry(req.body);  // make a new  independent entry
    // await entry.save();
    const account_Name = entry.account_name;
    console.log(entry)
    console.log(account_Name)
    const account = await Account.findOne({ account_Name });
    console.log(' before entry account : ', account)

    account.entries.push(entry);// attaches the entry to found account 
    account.sum_Debited_Amount += entry.debit;
    account.sum_Credited_Amount += entry.credit;
    await entry.save();
    await account.save();

    console.log('entry : ', entry);
    console.log(' after entry account : ', account);

    res.redirect(`/accounts/${ account._id }`)
})



// =================================== s h o w   e n t r i e s===================================
// DISPLAY ALL ENTRIES

app.get('/entries', async (req, res) => {
    const { flag } = req.query;
    if (flag) {
        const entries = await Entry.find({ flag })
        res.render('entries/show', { entries, flag })
    } else {
        const entries = await Entry.find({})
        res.render('entries/show', { entries, flag: 'All' })
    }
})

app.get('/entries', async (req, res) => {

    flag = 'normal';
    // const Accounts = await Account.find({})
    const entries = await Entry.find({})
    console.log(entries);
    // res.send("progress!!!!")
    res.render('entries/show', { entries, flag });
})


// DISPLAY GENERAL JOURNAL ENTRIES
app.get('/entries/GeneralJournal', async (req, res) => {
    const entries = await Entry.find({ flag: 'normal' });
    flag = 'normal'
    console.log(entries);
    // res.send("All G J WILL BE HERE");
    res.render('entries/show', { entries, flag })
})

// DISPLAY ADJUSTMENT ENTRIES
app.get('/entries/adjustment', async (req, res) => {
    let adjusted_entries = await Entry.find({ flag: 'adjustment' });

    let entries = await Entry.find({ flag: 'normal' });

    Array.prototype.push.apply(entries, adjusted_entries);


    res.render('entries/show', { entries, flag })
})

// DISPLAY CLOSING ENTRIES
app.get('/entries/closing', async (req, res) => {
    const entries = await Entry.find({});
    flag = 'closing'
    console.log(entries);
    // res.send("All G J WILL BE HERE");
    res.render('entries/show', { entries, flag })
})
// DISPLAY SINGLE ENTRY
app.get('entries/:id', async (req, res) => {
    const flag = 'all'
    const { id } = req.params;
    const account = await Account.findById(id)
    const allEntries = await Account.find({})
    console.log(account);
    // res.send("All PRODUCTS WILL BE HERE");
    res.render('/entries/singleshow', { allEntries, account, flag })
})
// =================================== u p d a t e    e n t r i e s ===================================

app.get('/entries/:id/edit', async (req, res) => {
    const { id } = req.params;
    const entry = await Entry.findById(id)
    console.log(entry);
    res.render('entries/edit', { entry, flags, })

})

app.put('/entries/:id', async (req, res) => {
    const { id } = req.params;
    const olderEntry = await Entry.findById(id);
    const updatedEntry = await Entry.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    await updatedEntry.save();


    // UPDATE THE ASSOCIATED ACCOUNT TOO
    // find the assoicated accountconst account_Name = entry.account_name;
    const account_Name = olderEntry.account_name;
    console.log(olderEntry)
    console.log(account_Name)
    const olderAccount = await Account.findOne({ account_Name });

    // first find  the older debit and credit from sum credit and debit

    let olderAccountSumDebit = olderAccount.sum_Debited_Amount - olderEntry.debit;
    let olderAccountSumCredit = olderAccount.sum_Credited_Amount - olderEntry.credit;

    let UpdatedAccountSumDebit = olderAccountSumDebit + updatedEntry.debit;
    let UpdatedAccountSumCredit = olderAccountSumCredit + updatedEntry.credit;


    // then insert the new debit and credit from sum debit and credit

    const updatedAccount = await Account.updateOne({ account_Name },
        {
            $set:
            {
                sum_Debited_Amount: UpdatedAccountSumDebit,
                sum_Credited_Amount: UpdatedAccountSumCredit
            }
        })

    // save account
    await account.updateOne();

    // await account.save();
    // console.log(req.body)
    // res.redirect(`/entries/${updatedEntry._id}`)
    res.send('done')
    // res.render('/entries/show')
})

// =================================== d e l e t e     e n t r i e s ===================================


app.delete('/entries/:id', async (req, res) => {
    const { id } = req.params;
    const deletedEntry = await Entry.findByIdAndDelete(id);

    // find the associated account name
    const account_Name = deletedEntry.account_name;


    const olderAccount = await Account.findOne({ account_Name })

    let olderAccountSumDebit = olderAccount.sum_Debited_Amount
    let olderAccountSumCredit = olderAccount.sum_Credited_Amount

    let UpdatedAccountSumDebit = olderAccountSumDebit - deletedEntry.debit;
    let UpdatedAccountSumCredit = olderAccountSumCredit - deletedEntry.credit;

    const updatedAccount = await Account.updateOne({ account_Name },
        {
            $set:
            {
                sum_Debited_Amount: UpdatedAccountSumDebit,
                sum_Credited_Amount: UpdatedAccountSumCredit
            }
        })

    // save account
    await account.updateOne();


    // delete entry's debit credit histroy from account too


    res.redirect('/entries');
})






// ======================== T R I A L   B A L A N C E   R O U T E S ========================

// SIMPLE TRIAL BALANCE

app.get('/trial_balance', async (req, res) => {
    const flag = 'normal';
    const company = await Company.findOne();
    console.log('fount compamy:', company)

    let accounts = await Account.find({});
    let entries = await Entry.find({ flag });

    console.log(entries)
    res.render('trialBalance', { company, accounts, flag, entries })
})

// ADJUSTED TRIAL BALANCE

app.get('/trial_balance/adjusted', async (req, res) => {
    const flag = 'adjustment';
    const company = await Company.findOne();
    console.log('fount compamy:', company)

    let accounts = await Account.find({});
    let entries = await Entry.find({ flag });
    let normal_entries = await Entry.find({ flag: 'normal' });

    Array.prototype.push.apply(entries, normal_entries);

    res.render('trialBalance', { company, accounts, flag, entries })
})

// POST CLOSING TRIAL BALANCE

app.get('/trial_balance/closed', async (req, res) => {
    const flag = 'closing';


    const company = await Company.findOne();
    console.log('fount compamy:', company)


    let accounts = await Account.find({});
    let entries = await Entry.find({});

    res.render('trialBalance', { company, accounts, flag, entries })
})





// ======================== F I N A N C I A L   S T A T E M E N T S   R O U T E S ========================

// ======================== I N C O M E   S H E E T    ========================

app.get('/financial_statements/income_statment', async (req, res) => {

    const company = await Company.findOne();
    console.log('fount compamy:', company)
    const revenue_accounts = await Account.find({ major_head: 'revenue' });

    const expense_accounts = await Account.find({ major_head: 'expense' });
    res.render('financialSheets/IncomeStatement', { company, expense_accounts, revenue_accounts })

})

// ======================== O W N E R   C A P I T A L    S H E E T    ========================

app.get('/financialStatements/owner_capital_statement', async (req, res) => {
    const company = await Company.findOne();

    const owner_capital_account = await Account.findOne({ major_head: 'ownercapital' });
    const owner_withdrawl_account = await Account.findOne({ major_head: 'ownerwithdrawl' });
    // const owner_accounts = await Account.find({ major_head: 'ownercapital' });
    console.log(owner_capital_account, owner_withdrawl_account)
    res.render('financialSheets/OwnerCapitalStatement', { company, owner_capital_account, owner_withdrawl_account })
})

// ======================== B A L A N C E   S H E E T    ========================

app.get('/financial_statements/balance_sheet', async (req, res) => {
    const company = await Company.findOne();

    const assets_accounts = await Account.find({ major_head: 'asset' });

    const liabilites_accounts = await Account.find({ major_head: 'liability' });
    const owner_capital_accounts = await Account.find({ major_head: 'ownercapital' });
    // res.send("hey")
    res.render('financialSheets/BalanceSheet', { company, assets_accounts, liabilites_accounts, owner_capital_accounts })

})
// ======================== A L L   R O U T E S ========================







// all() is for every single request (get/post...). * means for everypath
app.all('*', (req, res, next) => {
    // sends the next error handler middleware  express error that includes a message and status code
    // next(new ExpressError('Page Not Found', 404))
    res.send("Such A Page Does Not Exists")
})


app.listen(3000, () => {

    console.log(" ----------------------------------------------------------------------------------------------------------------------");
    console.log('Welcome to Server Land : D on  3000')
    console.log(' ');
})