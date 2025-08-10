## 📊 Slides: Database Programming with Node.js

---

### Slide 1: Introduction to Databases

* What is a database?
* Why databases are important in web apps?
* Two main types:

  * Relational (SQL)
  * NoSQL
* Common DBMS: MySQL, MongoDB, PostgreSQL, Redis

---

### Slide 2: Relational Database Concepts

* Tables, Rows, Columns
* Primary Key: Unique identifier
* Foreign Key: Reference to another table
* Schema: Predefined structure

---

### Slide 3: Installing MySQL

**Windows**:

* Download from mysql.com
* Use installer to setup MySQL Server and Workbench
* Set root password, start service

**Linux (Ubuntu)**:

```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

---

### Slide 4: MySQL Table Example

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(100)
);
```

---

### Slide 5: Basic SQL Commands

```sql
INSERT INTO users (name, email) VALUES ('Ali', 'ali@email.com');
SELECT * FROM users;
UPDATE users SET name='Ahmed' WHERE id=1;
DELETE FROM users WHERE id=1;
```

---

### Slide 6: Filtering, Sorting, Joins

```sql
SELECT * FROM users WHERE name = 'Ali';
SELECT * FROM users ORDER BY name ASC;

SELECT orders.id, users.name
FROM orders
JOIN users ON orders.user_id = users.id;
```

---

### Slide 7: Node.js + MySQL

```bash
npm install mysql2
```

```js
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost', user: 'root', password: '', database: 'myapp'
});
conn.query('SELECT * FROM users', (err, results) => {
  console.log(results);
});
```

---

### Slide 8: Introduction to NoSQL and MongoDB

* NoSQL = Non-tabular, flexible data model
* Types: Document, Key-Value, Column, Graph
* MongoDB = Document-based

---

### Slide 9: Installing MongoDB

**Windows**:

* Download MongoDB Community Server
* Install with MSI installer
* Use Compass for GUI

**Linux (Ubuntu)**:

```bash
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod
```

---

### Slide 10: MongoDB Document Example

```json
{
  "_id": "123",
  "name": "Ali",
  "email": "ali@email.com"
}
```

* Document ≈ Row
* Collection ≈ Table

---

### Slide 11: Node.js + MongoDB (Native, CommonJS)

```bash
npm install mongodb
```

```js
// Using CommonJS (default in Node.js)
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  await client.connect();
  const db = client.db('myapp');
  const users = db.collection('users');
  await users.insertOne({ name: 'Ali', email: 'ali@email.com' });
  console.log(await users.find().toArray());
}
run();bash
npm install mongodb
```

```js
// package.json should have: "type": "module"
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');
    await users.insertOne({ name: 'Ali', email: 'ali@email.com' });
    console.log(await users.find().toArray());
  } finally {
    await client.close();
  }
}
run();bash
npm install mongodb
```

```js
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  await client.connect();
  const db = client.db('myapp');
  const users = db.collection('users');
  await users.insertOne({ name: 'Ali', email: 'ali@email.com' });
  console.log(await users.find().toArray());
}
run();
```

---

### Slide 12: Mongoose ORM

```bash
npm install mongoose
```

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
User.create({ name: 'Ali', email: 'ali@email.com' });
```

---

### Slide 13: Population & Aggregation

```js
// Referencing
Order.find().populate('user');

// Aggregation
Order.aggregate([
  { $group: { _id: "$product", count: { $sum: 1 } } }
]);
```

---

### Slide 14: MongoDB Atlas (Cloud Hosting)

* Create free account at mongodb.com
* Create cluster
* Use connection string with Mongoose

```js
mongoose.connect('mongodb+srv://<user>:<pass>@cluster.mongodb.net/myapp');
```

---

### Slide 15: Redis (Key-Value Store)

```bash
npm install redis
```

```js
const redis = require('redis');
const client = redis.createClient();
client.connect();

client.set('user_1', 'Ali');
client.get('user_1').then(console.log);
```

* Used for caching and fast data access

---

### Slide 16: Sequelize ORM for MySQL

```bash
npm install sequelize mysql2
```

```js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('myapp', 'root', '', { dialect: 'mysql' });

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

sequelize.sync();
User.create({ name: 'Ali', email: 'ali@email.com' });
```

---

### Slide 17: Database Security Tips

* Use environment variables for credentials
* Validate all input
* Use ORM/Query Builder to prevent SQL injection
* Assign minimal permissions to DB users

---

### Slide 18: Summary

* Databases = essential for persistent data
* MySQL: Structured, relational data
* MongoDB: Flexible, JSON-like documents
* Redis: Fast in-memory key-value store
* Practice CRUD in both SQL and NoSQL
* Use ORMs like Mongoose and Sequelize to simplify code

---

Let me know if you want this exported as Google Slides or PPTX!
