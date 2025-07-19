const express = require('express');
const courseRouter = express.Router()

courseRouter
    .use((req,res,next)=>{
        console.log('>>>my middleware')
        next()
    })
    .get('/',(req,res)=>{
        res.send('all users')
        
    })
     .get('/:id',(req,res)=>{
        res.send(`user param ${req.params.id}`)
        
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
module.exports = {courseRouter};