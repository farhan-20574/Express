const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with your actual secret key

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};