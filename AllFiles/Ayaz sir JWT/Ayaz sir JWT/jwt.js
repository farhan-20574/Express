const jwt = require('jsonwebtoken');

const APP_KEY = 'my-secret-key'

var token = jwt.sign({ id: 123 }, APP_KEY);


console.log(token)

console.log(jwt.verify(token, APP_KEY));
