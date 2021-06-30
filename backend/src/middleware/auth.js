const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next){
    let token = req.get("auth-token"); //organizar lógica -> não está funcionando	
    if(!token) {
        return res
            .status(401)
            .json({"message": "Não autenticado"}); //corrigir bugs
    }
	
    try{
        const verify = jwt.verify(token, process.env.TOKEN_HASH);
		if(!verify) {
			return res
				.status(401)//ver status code certinho
				.json({"message": "Não autenticado 1"});		
		}
        res.json({"message": "autenticado"});
		next();
		
    } catch {
        return res
            .status(400)//ver questão de redirecionar o usuário
            .json({"message": "usuário não autorizado"})
    }          
 }

module.exports = auth;