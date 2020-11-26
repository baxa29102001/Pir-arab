const mongoose = require("mongoose")
const config = require('../config/secrets')


const connectDb = async () => {
    try {
        await mongoose.connect(config.mongodb_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('Database connect')
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;



