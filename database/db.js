const mongoose = require("mongoose")


const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://baxa_2910:bohodir29102001<>@cluster0.dlfui.mongodb.net/<Mahsulotlar>?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log('Database connect')
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;



