const knex = require('../database');
const {v4} = require('uuid');

module.exports = {

    /* O carrossel precisa de dinamismo na lógica do Back-end, a ideia é colocar um argumento obrigatório para conseguir realizar a troca das informações de acordo com a equipe escolhida no carrossel */

   async index(req, res) {
		let crews = await knex('crews').select('*');
        return res.status(200).json(crews);
    },

	async show(req,res) {
		let { id } = req.params;
		let crew = await knex("crews").select().where({id});
		return res.status(200).json(crew);
	},

    async create(req, res) {
        let { name, about } = req.body;
        try{
            await knex("crews").insert({
                id: v4(),
                name, 
                about
            });
            return res.status(201).json({"message": "Equipe criada!!!"});
        } catch(err){
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res) {
        let { crew, data, update } = req.body;
        try{
            await knex("crews").where(crew).update({data, update});
            return res.status(200).json({"message": "Equipe atulizada!!!"});
        } catch(err) {
            return res.status(405).json({"message": err.message});
        }
    },

	async delete(req, res) {
		try {
			let { crew } = req.body;
			let confirmation = await knex('crews').where({"name": crew}).delete();
			return res.status(200).json({'message': confirmation});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	}
}