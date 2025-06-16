const express = require ('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use('/asset',express.static('public'))

const users = []





// app.get('/users/{:id}',(req,res)=>{
//     if (!req.params.id) return res.send(users)
    
    
//         const user = users.find((user)=> user.id === parseInt(req.params.id))
//         if (!user) return res.status(404).send({message: "User ot found"})
//         res.send(user)
// //     });

// app.get('/users/:id',(req,res)=>{
//     if (!req.params.id) {
//         return new Error("ID required")
//     }
    
//         const user = users.find((user)=> user.id === parseInt(req.params.id))
//         if (!user) return res.status(404).send({message: "User ot found"})
//         res.send(user)
//     });

app.post('/users', (req,res)=>{

    // console.log('>>>',req.body) //for see body
    const user ={
        id: Date.now(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        gender:req.body.gender
    }
    users.push(user)
    res.status(201).send({message: 'user created sucessfully'})
})


app.listen(3000, ()=>{
    console.log('server is running on po.rt 3000')
})