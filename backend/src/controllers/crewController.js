const knex = require('../database');


//Fazer os tratamentos com try-catch e retornar os status codes corretos para cada situação.
module.exports = {

    /* O carrossel precisa de dinamismo na lógica do Back-end, a ideia é colocar um argumento obrigatório para conseguir realizar a troca das informações de acordo com a equipe escolhida no carrossel */



   async index(req, res){
        let crews = await knex('crews').select('*');
        return res.json({
            "crews": crews
            // "equipes": "Byte, Botz, Rocket, WIE, Social, Power",
            // "premios": "premioByte, premioBotz, premioRocket"
        });
    },

	async delete(req, res){
		let { crew } = req.body;
		let confirmation = await knex('crews').where({"name": crew}).delete();
		return res.json({'message': confirmation});
	}
}