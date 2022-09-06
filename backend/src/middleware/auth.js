const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next){
    let authHeader = req.headers.authorization;

    if(!authHeader) {
        return res
            .status(401)
            .json({"erro": "Nenhum token fornecido"});
    }

	const parts = authHeader.split(' ');

	if(!parts.length == 2)
		return res.status(401).send({error: 'Token error'});
	
	const [ scheme, token ] = parts;

	if(!/^Bearer$/i.test(scheme))
		return res.status(401).send({error: 'Token malformed'});
    
	jwt.verify(token, process.env.TOKEN_HASH, (err) => {
		if(err) return res.status(401).send({ error: 'Token invalid'});

		return next()
	})
 }

module.exports = auth;