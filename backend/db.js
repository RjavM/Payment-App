
const mongoose = require("mongoose")




const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength:3,
        maxLength: 30 
    },
    firstname: {
        type: String,
        required: true,
        maxLength: 30
    },
    lastname: {
        type: String,
        required: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }    
})


const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {User, Account}