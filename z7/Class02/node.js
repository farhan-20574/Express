const http = require('http');
const fs = require('fs');
const express = require('express')
const app = express()

const users = ['farhan','hanzala','shoaib','']
const app = http.createServer((req,res)=>{
    console.log('>>>>>>')
    // await fs.readFile('./index.html', {encoding: 'utf-8'}, (err,data)=>{
    //     res.end(data)
    // })
        res.end()
})


app.listen(3000,()=>{
    console.log('server started')
})