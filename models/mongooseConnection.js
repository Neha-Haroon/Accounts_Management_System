const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/AccountsCycle').then(() => {
    console.log("Mongoose connected:true");
    console.log(" ----------------------------------------------------------------------------------------------------------------------");
})
    .catch((err) => {
        console.log(err)
    })
