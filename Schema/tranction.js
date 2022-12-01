const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    age: {
        type: Number
    }
})

module.exports = mongoose.model("users", userModel);
