const fsPromises = require('fs/promises')
const path = require('path');
const { database } = require('../services/database');
const users = database.collection('users');
const {ObjectId} = require('mongodb')

class User {
    static async all(isAdmin = false){
        if(isAdmin) return await users.find().toArray();  
        else return await users.find({ deleted_at: { $exists: false }, roles: { $ne: 'admin' } }).toArray();
    }

    static async getById(id){
        return await users.findOne({ _id: new ObjectId(id)});
    }

    static async create(user){
        try {
            return await users.insertOne({
                created_at: new Date(),
                roles: [],
                ...user
            })
        } catch (error) {
            throw new Error('User could not be created')
        }
    }
    static async delete(id){
        try {
            // const contents = await fsPromises.readFile(path.join(__dirname,'../database.json'), { encoding: 'utf8' });
            // const data = JSON.parse(contents)
            // await users.deleteOne({ _id: new ObjectId(id) });
            const user = await users.updateOne({ _id: new ObjectId(id) },{
                $set: {
                    deleted_at: new Date()
                }
            });
            return user;
        } catch (error) {
            throw new Error('User could not be deleted')
        }
    }

    get full_name() {
        return this.first_name + ' ' + this.last_name
    }
}

module.exports = User