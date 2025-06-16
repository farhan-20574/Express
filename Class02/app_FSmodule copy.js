const express = require ('express');
const FileSystem = require('fs');
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use('/asset',express.static('public'))

const users = []


/*
Log request time and path in file
file name : acess_logs.txt
*/

app.use((req , res, next)=>{
    const msg= `Request Time: ${new Date.time()} ::: Request Path :${req.path}`
    fs.appendFile ('acess_logs.txt', matchesGlob, (err)=>{
        if (err) throw err;
        console.log (' the "data t append" was appended t file!')
    })
    let fileContent ="";
    fs.readFile('acess_logs.txt',(err)=>{
        if (err) throw err;
        console.log (' the "data t append" was appended t file!')
    })

    fileContent = data.toString;

    res.send (fileContent)
})



// // app.get('/users/{:id}',(req,res)=>{
// //     if (!req.params.id) return res.send(users)
    
    
// //         const user = users.find((user)=> user.id === parseInt(req.params.id))
// //         if (!user) return res.status(404).send({message: "User ot found"})
// //         res.send(user)
// // //     });

// // app.get('/users/:id',(req,res)=>{
// //     if (!req.params.id) {
// //         return new Error("ID required")
// //     }
    
// //         const user = users.find((user)=> user.id === parseInt(req.params.id))
// //         if (!user) return res.status(404).send({message: "User ot found"})
// //         res.send(user)
// //     });

// app.post('/users', (req,res)=>{

//     // console.log('>>>',req.body) //for see body
//     const user ={
//         id: Date.now(),
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         age: req.body.age,
//         gender:req.body.gender
//     }
//     users.push(user)
//     res.status(201).send({message: 'user created sucessfully'})
// })


// app.listen(3000, ()=>{
//     console.log('server is running on po.rt 3000')
// })