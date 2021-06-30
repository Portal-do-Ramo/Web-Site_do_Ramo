const jwt = require('jsonwebtoken');
require('dotenv').config();
 
function authenticate(name, email, role){
    return jwt.sign({name, email, role}, process.env.TOKEN_HASH, {expiresIn: '48h'});
}

module.exports = authenticate;