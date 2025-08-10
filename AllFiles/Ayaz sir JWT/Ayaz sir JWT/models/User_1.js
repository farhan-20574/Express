const fsPromises = require('fs/promises')
const path = require('path');

class User {
    static async all(showTrashed = false){
        const contents = await fsPromises.readFile(path.join(__dirname,'../database.json'), { encoding: 'utf8' });
        const data = JSON.parse(contents)
        const users = data.users || []
        return showTrashed ? users : users.filter(user => !user.deleted_at && !user.roles.includes('admin'))
    }

    static async getById(id){
        const contents = await fsPromises.readFile(path.join(__dirname,'../database.json'), { encoding: 'utf8' });
        const data = JSON.parse(contents)
        const users = data.users || []
        return users.find(user => user.id === parseInt(id) && !user.deleted_at && !user.roles.includes('admin'))
    }

    static async create(user){
        try {
            const contents = await fsPromises.readFile(path.join(__dirname,'../database.json'), { encoding: 'utf8' });
            const data = JSON.parse(contents)
            const users = data.users || []
            const newUser = {
                id: users.length + 1,
                created_at: new Date(),
                roles: [],
                ...user
            }
            
            users.push(newUser)
            await fsPromises.writeFile(path.join(__dirname,'../database.json'), JSON.stringify(data))
            return newUser;
        } catch (error) {
            throw new Error('User could not be created')
        }
    }
    static async delete(id){
        try {
            const contents = await fsPromises.readFile(path.join(__dirname,'../database.json'), { encoding: 'utf8' });
            const data = JSON.parse(contents)
            const user = data.users.find(user => user.id === id);
            if (!user) return res.status(404).send('User not found');
            user.deleted_at = new Date()
            await fsPromises.writeFile(path.join(__dirname,'../database.json'), JSON.stringify(data))
            return true;
        } catch (error) {
            throw new Error('User could not be deleted')
        }
    }

    get full_name() {
        return this.first_name + ' ' + this.last_name
    }
}

module.exports = User