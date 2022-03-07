const jwt = require('jsonwebtoken');
require('dotenv').config();
 
function authenticate(name, email){
    return jwt.sign({name, email}, process.env.TOKEN_HASH, {expiresIn: '48h'}); 
}

module.exports = authenticate;