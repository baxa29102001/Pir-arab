const moongoose = require('mongoose')

const qurilish = new moongoose.Schema({
  productName: String,
  productSumNum:Number,
  productNum: Number,
  
  productDate:{
      type:Date,
      default:Date.now
  },
  manzil:{
      type:moongoose.Schema.Types.ObjectId,
      ref:'manzil'
  },
  ishlatilgan:[{
    type:moongoose.Schema.Types.ObjectId,
    ref:'useProduct'
  }]
})

const Qurilish = moongoose.model('qurilish',qurilish)

module.exports = Qurilish