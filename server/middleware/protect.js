const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();
const jwt_secret = process.env.jwt_secret

exports.protect = async(req, res, next)=>{
let token;
try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.header.authorization(" ")[1]
    }
    next();

    if(!token){
        res.status(401).json({
            error: "Not authorized to access this route"
        })
    }

    const decoded = jwt.verify(token, jwt_secret);
    const user = await User.findById(decoded.id);

    if(!user){
        res.status(404).json({message: 'Not authorized'})
    }
    req.user  = user;
    console.log(user)
    next();
} catch (error) {
    console.log(error)
}
}

// //Bearer is added in front of the token to show that it is an authentication bearing token
// //we are exporting a function called protect. 
