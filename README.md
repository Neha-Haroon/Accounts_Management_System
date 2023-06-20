# Accounts_Management_System
Web project 
used MongoDB for storing and retrieving accounts info mainly 3 models: companies ->(company's) accounts -> (accounts) entries
used NodeJS and Express for backend and APIs
used EJS for dynamic pages and calculations

HOW TO START THE WEB PAGE:
npm init
npm i (install all the packages mentioned in the app.js file in the start)
node app.js

HOW TO USE:
first, create a company 
then make the accounts (categorized by Major Heads: Assets, Liabilities, Owner Capital, Owner Withdrawl, Expense, Revenue, Income Summary) with some initial balance for debit and credit
then you can insert your entries into their accounts based on (normal / adjustment/closing)entries 
you can see the normal / adjustment/closing trial balances 
also the financial statements are provided (income statement, owner capital statement, balance sheet)
