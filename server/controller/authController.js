const mongoose = require('mongoose');
const auth_route = require('../routes/auth');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secret = process.env.jwt_secret



exports.register = async(req,res, next)=>{
 const {username, password, email} = req.body;
 const hashpassword = await bcrypt.hash(password, 10);

 const user = await User.findOne({username})
 const user_email = await User.findOne({email})

 try {
    if(!username || !password || !email){
        res.status(400).json({message: 'Please provide Credentials'})
    next()
    }
    if(user){
      return  res.json({message: 'Please Login'});
        }
    else if (user_email){
        return res.json({message: "Please Login"})
    }
    const newUser = new User({
         username, password:hashpassword, email, 
                  })
                  newUser.save();
                 res.json({message: "User Registration Successful"})
              }
            
 catch (error) {
    console.log(error)
 }
}



exports.login = async(req, res, next)=>{
    const {username, password, email} = req.body;
    const user = await User.findOne({username})
    const passwordValidation = await bcrypt.compare(password, user.password);
    const Token  = jwt.sign({id: user._id}, secret, {expiresIn: '1hr'})
try {
    if(user && passwordValidation){
    return res.status(200).json({Token})
    }
    else{
        res.status(401).json({message: 'Credentials Invalid'})
    }
    next();
} catch (error) {
    console.log(error)
}
}




exports.usercontent = async(req, res)=>{
res.send('The user can view this page')
}
