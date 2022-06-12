const express=require('express')
const { sendMail } = require('./emailController')

const router=express.Router()


router.post('/send/mail',sendMail)




module.exports=router