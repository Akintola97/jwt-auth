const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: [true, 'Please add a username'],
        unique: [true, 'An account with the username exists']
    },
    password:{
        type: String,
        require: [true, 'Please add a password' ]
    },
    email:{
        type: String, 
        required: [true, 'Please add an email address'],
        unique: [true, 'An account with this e-mail address exists'],
        match: [
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 
        "please provide a valid email"
             ], //mongoose feature that matches a regular expression for email (checks to confirm its a valid email address)
            },
    
},
{timestamps: true}
)


const User = mongoose.model('user', userSchema);

module.exports = User;