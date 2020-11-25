const express = require('express')
const router = express.Router()
const Manzil = require('../models/mahsulot')
const Mahsulot = require('../models/qurilsh')
const UseProduct = require('../models/use')
const Users = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/adress',async(req,res)=>{
    const manzillar = await Manzil.find()
    .select({adress:1})
   


    res.status(200).json(manzillar)
})

router.get('/adress/:id',async(req,res)=>{
    let manzilId = req.params
    const manzil = await Manzil.findById(manzilId.id)
    .populate('qurilshProduct');
    
    res.status(200).json(manzil)
})

router.post('/manzil', async(req,res)=>{
   try {
    let mahsulot = new Manzil({
        adress:req.body.adress
    })

       let saveMah = await mahsulot.save()
       const manzillar = await Manzil.find()
       .select({adress:1})
    res.status(201).json(manzillar);
   } catch (error) {
       console.log(error)
   }
})

router.post('/:id/mahsulot',async (req,res)=>{
    try {
        let manzilId = req.params
       
        let mahsulot = new Mahsulot(req.body)
       
        let findManzil = await Manzil.findById(manzilId.id)
      
            mahsulot.manzil = findManzil 

        await mahsulot.save()

        findManzil.qurilshProduct.push(mahsulot)

        await findManzil.save()

        res.status(201).json(mahsulot)

        
    } catch (error) {
        console.log(error)
    }
})

router.post('/:id/update',async (req,res)=>{
    try {
             
        const useMah = new UseProduct(req.body)
        const findUpdate = await Mahsulot.findById(req.params.id)
         
         await useMah.save() 

         findUpdate.ishlatilgan.push(useMah)
          await findUpdate.save()
         const arr = await Mahsulot.findById(req.params.id)
         .populate('ishlatilgan')
   
          const manba = arr.ishlatilgan 
         let son = 0
         for (let index = 0; index < manba.length; index++) {
            son += manba[index].useProduct;
             
         }
         console.log(son)
           
         
         findUpdate.productNum = son     

          const updateMah =  await findUpdate.save();

          res.status(200).json(updateMah)

    } catch (error) {
        console.log(error)
    }
})



router.post('/register', async (req, res) => {
    let { userName, password, role, id } = req.body
    try {
        if (!userName ||  !password || !id )
      return res
        .status(400)
        .json({msg :"Iltimos bosh qatorlarni toldiring"});

  
    const existsUser = await Users.findOne({ userName: userName });
    if (existsUser)
      return res.status(500).json({
        message: "Bu turdagi foydalunvchi bizni saytdan ro'yxatdan o'tgan ",
      });

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    const user = new Users({
      userName:userName,
      password: passwordHashed,
      role:role,
      id:id
    });

    const saveuser = await user.save();
    res.status(201).json(saveuser);

    } catch (error) {
        console.log(error)
    }
})

router.post('/login',async (req, res) => {
   let {userName, password} = req.body
    try {
        if (!userName || !password)
      return res
        .status(400)
        .json({ message: "Iltimos bosh joylarni to'ldiring" });

    const user = await Users.findOne({ userName: userName });
    if (!user)
      return res.status(400).json({ message: "Bu username royxatdan o'tmagan" });

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return res.status(400).json({
        message: "Kiritilgan parol noto'gri! Qaytadan urinib ko'ring",
      });

        await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err,token) => {
            if (err) console.log(err)
            
            res.status(200).json({
                token,
                user
            })
        })
        
           } catch (error) {
        console.log(error)
    }
})




module.exports = router