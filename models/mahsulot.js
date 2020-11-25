const moongoose = require('mongoose')

const mahsulot = new moongoose.Schema({
    adress: String,
    qurilshProduct:[{
     type:moongoose.Schema.Types.ObjectId,
     ref:"qurilish"
    }]
})

const Manzil = moongoose.model('manzil',mahsulot)

module.exports = Manzil