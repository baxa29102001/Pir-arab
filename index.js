const express = require('express');
const app = express();
const connect = require("./database/db")
const authrouter = require('./routes/auth')
const path = require('path')
const config = require('./config/secrets')



//Middleware functions

connect()
app.use(express.json())
app.use('/api',authrouter)


if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



const port = process.env.Port || 5000
app.listen(port,()=>{
    console.log(`Port is working ${port}`)
})