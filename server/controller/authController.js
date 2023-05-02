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
    const {username, password} = req.body;
    const user = await User.findOne({username})
    const passwordValidation = user && user.password ? await bcrypt.compare(password, user.password) : false;
    const Token = user && user._id ? jwt.sign({id: user._id}, secret, {expiresIn: '1hr'}) : false;

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


exports.tokenVerification = async(req, res, next)=>{

    try {
    
        if (!req.headers.authorization){
            return res.status(401).json({message: 'Unauthorized!'})
        }
    
        const token = req.headers.authorization.split(' ')[1]; 
        
        if(!token){
            res.status(401).json({
                error: "Not authorized to access this route"
            })
            return;
        }
    
        jwt.verify(String(token), secret, (err, user)=>{
            if(err){
            return res.status(400).json({message: 'Invalid Token'});
            }
            // console.log(user.id)
            req.id = user.id
        })
    next();

    } catch (error) {
        console.log(error)
    }
    }  
    // //Bearer is added in front of the token to show that it is an authentication bearing token
    // //we are exporting a function called protect. 

///////////////////////////////////////////////////////////////////////


//Getting the details of the user from the decoded Token
    exports.userInfo = async(req, res, next)=>{
        const userId = req.id;
        const user = await User.findById(userId, "-password") //This removes the password from the user being shown
        try {
            if(!user){
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json({user})
        } catch (error) {
            console.log(error)
        }
    }
   
    

