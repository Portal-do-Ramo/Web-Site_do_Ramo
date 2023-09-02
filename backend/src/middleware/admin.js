const jwt = require('jsonwebtoken');
const knex = require('../database');
require('dotenv').config()

function admin(req, res, next) {
    let authHeader = req.headers.authorization;
	const parts = authHeader.split(' ');
	const [ scheme, token ] = parts;
    
    const { isAdmin } = jwt.verify(token, process.env.TOKEN_HASH);
    
    if (isAdmin)
        return next();

    return res.status(401).send({ error: 'User is not admin' });
    
}

module.exports = admin;