const moongoose = require('mongoose')

const useProduct = new moongoose.Schema({
   useProduct:Number,
   useProductDate:{
       type:Date,
       default:Date.now
   }
})

const UseProduct = moongoose.model('useProduct',useProduct)

module.exports = UseProduct