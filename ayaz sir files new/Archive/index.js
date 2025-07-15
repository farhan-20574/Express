const fsPromises = require('fs/promises')
const fs = require('fs')

const validations = require('./validations');
const express = require('express');
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// async function getFileData() {
//     try {
//         const contents = await fsPromises.readFile('./users.json', { encoding: 'utf8' });
//         console.log(contents);
//     } catch (err) {
//         console.error(err.message);
//     }
// }

// getFileData()

// async function updateFile() {
//     fs.appendFile('./users.json', JSON.stringify({
//         data: []
//     }), 'utf8', (err) => {
//         if (err) throw err;
//     });
// }

// updateFile()
// updateFile()

app.use((req, res, next) => {
    const log = `REQUEST TIME: ${new Date()} :::: METHOD: ${req.method} :::: URL: ${req.url}\n`
    fs.appendFile('./access_logs.txt', log, 'utf8', (err) => {
        if (err) throw err;
    });

    next();
})

/**
 * Users data
 */
// const users = []

/**
 * READ ALL USERS
 */
app.get('/users', async (req, res) => {
    try {
        const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' });
        const data = JSON.parse(contents)
        const users = data.users.filter(user => !user.deleted_at)
        res.send({
            meta: {
                total: users.length,
            },
            data: users
        })
    } catch (err) {
        console.error(err.message);
    }

})
/**
 * READ USER BY ID
 */
app.get('/users/:id', async (req, res) => {
    const id = req.params.id    
    try {
        const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' });
        const data = JSON.parse(contents)
        const user = data.users.find(user => user.id === parseInt(id))
        if (!user || (!req.query.admin && user.deleted_at)) return res.status(404).send('User not found');
        res.send({
            data: user
        })
    } catch (err) {
        console.error(err.message);
    }
    
    
    res.send({
        data: user
    })
})
/**
 * CREATE USER
 */
app.post('/users', validations.createUserRequest, async (req, res) => {
    const user = req.body;
    try {
        const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' });
        const data = JSON.parse(contents)
        
        const newUser = {
            id: data.users.length + 1,
            created_at: new Date(),
            ...user
        }
        
        data.users.push(newUser)
        await fsPromises.writeFile('./database.json', JSON.stringify(data))

        res.send({
            data: newUser
        })
    } catch (err) {
        console.error(err.message);
    }
})
/**
 * UPDATE USER
 */
app.patch('/users', (req, res) => {
    res.send('Users page')
})
/**
 * DELETE USER
 */
app.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const contents = await fsPromises.readFile('./database.json', { encoding: 'utf8' });
        const data = JSON.parse(contents)
        const user = data.users.find(user => user.id === id);
        if (!user) return res.status(404).send('User not found');
        user.deleted_at = new Date()
        await fsPromises.writeFile('./database.json', JSON.stringify(data))
        res.status(203)
        res.send({ message: 'User deleted' })
    } catch (err) {
        console.error(err.message);
    }
})



const PORT = 3000
app.listen(PORT, () => {
    console.log('Server started at', `http://localhost:${PORT}`)
})