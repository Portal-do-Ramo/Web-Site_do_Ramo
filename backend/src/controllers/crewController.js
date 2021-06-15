const knex = require('../database');

module.exports = {

    /* O carrossel precisa de dinamismo na lógica do Back-end, a ideia é colocar um argumento obrigatório para conseguir realizar a troca das informações de acordo com a equipe escolhida no carrossel */

    async index(req, res){
        let crews = await knex('crews').select('*');
        return res.json({
            "crews": crews
            // "equipes": "Byte, Botz, Rocket, WIE, Social, Power",
            // "premios": "premioByte, premioBotz, premioRocket"
        });
    }
}