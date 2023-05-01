const express = require('express');
const { register, login, content, usercontent } = require('../controller/authController');
const { protect } = require('../middleware/protect');
const auth_route = express.Router();



auth_route.post('/register', register)

auth_route.post('/login', login)

auth_route.get('/content', protect, usercontent)
// auth_route.get('/content', usercontent)

module.exports = auth_route;