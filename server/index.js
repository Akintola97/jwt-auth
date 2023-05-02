const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = 5000;
const hostname = 'localhost'
const mongodb = process.env.mongo_db;
const mongoose = require('mongoose')
const auth_route = require('./routes/auth')
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth_route)


mongoose.connect(mongodb).then(()=>{
    console.log('Db is connected')
}).catch((error)=>{
    console.log(error)
})

app.listen(port, hostname, ()=>{
    console.log('server is running')
})