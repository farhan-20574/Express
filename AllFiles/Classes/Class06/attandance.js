const express = require('express');
const attendanceRouter = express.Router()

attendanceRouter
    .use((req,res,next)=>{
        console.log('>>>my middleware')
        next()
    })
    .get('/',(req,res)=>{
        res.send('all users')
        
    })
    .post('/',(req,res)=>{
        res.send('create user')
        
    })
    .patch('/',(req,res)=>{
        res.send('update user')
        
    })
    .delete('/',(req,res)=>{
        res.send('delete user')
        
    })
module.exports = {attendanceRouter};