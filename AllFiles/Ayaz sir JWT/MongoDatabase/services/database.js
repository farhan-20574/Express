const { MongoClient } = require('mongodb');

// const database = client.connect().then(() => {
    
    // const url = 'mongodb://127.0.0.1:27017';
    // const client = new MongoClient(url);
    // const dbName = 'techpark';
//     console.log('Connected successfully to database server');
//     return client.db(dbName);
// }).catch((error)=>{
//     console.log('Database could not be initialized successfully::', error)
//     client.close();
// })

function initialize() {
    const url = 'mongodb://127.0.0.1:27017';
    const client = new MongoClient(url);
    const dbName = 'techpark';
    try {
        client.connect(); // promise
        console.log('Connected successfully to database server');
        return client.db(dbName);
    } catch (error) {
        console.log('Database could not be initialized successfully::', error)
        client.close();
    }
}

const database = initialize();

module.exports = {
    database
}