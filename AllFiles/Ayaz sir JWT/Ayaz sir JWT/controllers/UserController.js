const fsPromises = require('fs/promises')
const path = require('path');

const User = require('../models/User')

async function getAll (req, res) {
    try {
        const isAdmin = req.user.roles.includes('admin')
        const users = await User.all(isAdmin);
        res.send({
            meta: {
                total: users.length,
            },
            data: users
        })
    } catch (err) {
        console.error(err.message);
    }

}
async function getById(req, res) {
    const id = req.params.id    
    try {
        const user = await User.getById(id);
        if (!user) return res.status(404).send('User not found');
        res.send({
            data: user
        })
    } catch (err) {
        console.error(err.message);
    }
    
    res.send({
        data: user
    })
}
async function create(req, res) {
    const user = req.body;
    try {
        const newUser = await User.create(user)
        res.send({
            data: newUser
        })
    } catch (err) {
        console.error(err.message);
    }
}

async function update(req, res) {
    res.send('Users page')
}
async function destroy (req, res) {
    const id = parseInt(req.params.id)
    try {
        await User.delete(id)
        res.status(203)
        res.send({ message: 'User deleted' })
    } catch (err) {
        console.error(err.message);
    }
}
module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy
}