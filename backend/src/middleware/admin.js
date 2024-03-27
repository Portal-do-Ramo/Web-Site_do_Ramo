const jwt = require('jsonwebtoken');
require('dotenv').config();

function admin(req, res, next) {
	let authHeader = req.headers.authorization;
	const parts = authHeader.split(' ');
	const [, token ] = parts;
    
	const { isAdmin } = jwt.verify(token, process.env.TOKEN_HASH);
    
	if (isAdmin)
		return next();

	return res.status(401).send({ error: 'User is not admin' });
    
}

module.exports = admin;