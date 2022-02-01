require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.signToken = (payload) => {
    try {
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        return false;
    }
}

exports.decodeToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, jwtSecretKey);
        return decodedToken;
    } catch (error) {
        return false;
    }
}