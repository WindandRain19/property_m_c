const express = require('express')
const homeRouter = express.Router()

homeRouter.get("",(req,res)=>{
    res.send('请求成功')
})

module.exports = homeRouter