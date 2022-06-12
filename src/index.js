const config = require('./config');

const express=require('express');
const router = require('./route');
const app=express()

app.use(express.json());
app.use(router)





app.listen(config.PORT,()=>{ console.log(`listing on PORT ${config.PORT}`)})