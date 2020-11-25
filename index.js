const express = require('express');
const app = express();
const connect = require("./database/db")
const authrouter = require('./routes/auth')

require('dotenv').config()

//Middleware functions

connect()
app.use(express.json())
app.use('/api',authrouter)






const port = process.env.Port || 5000
app.listen(port,()=>{
    console.log(`Port is working ${port}`)
})