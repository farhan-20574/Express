const express = require ('express');

const app = express();


// app.get('/users/{:id}',(req,res)=>{
//     if (!req.params.id) return res.send(users)
    
    
//         const user = users.find((user)=> user.id === parseInt(req.params.id))
//         if (!user) return res.status(404).send({message: "User ot found"})
//         res.send(user)
//     });

app.get('/users/:id',(req,res)=>{
    if (!req.params.id) {
        return new Error("ID required")
    }
    
        const user = users.find((user)=> user.id === parseInt(req.params.id))
        if (!user) return res.status(404).send({message: "User ot found"})
        res.send(user)
    });

app.post('/users', (req,res)=>{

    const user ={
        id: Date.now(),
        first_name: 'John',
        last_name: 'john_doe',
        email: 'johndoe@example.com',
        age: 23,
        gender:'male'
    }
    users.push(user)
    res.status(201).send({message})
})


app.listen(3000, ()=>{
    console.log('server is running on po.rt 3000')
})