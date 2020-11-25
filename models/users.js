const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    role: {
        type: Number,
        default: 0
    },
    id:String
})

const Users = mongoose.model('users', userSchema)

module.exports = Users