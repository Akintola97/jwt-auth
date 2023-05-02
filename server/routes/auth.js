const express = require('express');
const { register, login, tokenVerification, userInfo } = require('../controller/authController');
const auth_route = express.Router();



auth_route.post('/register', register)

auth_route.post('/login', login)

auth_route.get('/content', tokenVerification, userInfo )

module.exports = auth_route; 