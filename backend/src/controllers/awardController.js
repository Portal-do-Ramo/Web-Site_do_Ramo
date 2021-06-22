const { v4 } = require("uuid");
const knex = require("../database");
const crewServices = require("../services/crewReferences");


//Fazer os tratamentos com try-catch e retornar os status codes corretos para cada situação.
module.exports = {

    async index(req,res) { //
            let awards = await knex("awards")
            return res.json(awards);
    },
    
    async show(req,res) { //mostrar só um
        let {id} = req.params;
			let award = await knex("awards").select().where({id});
            return res.json(award);
    },
	
    async create(req,res) {
		let { name, description, img, crew_name } = req.body;
		let { id: crew_id } = await crewServices.getCrew(crew_name).first();

        try {
            await knex("awards").insert({
				id: v4(),
                name,
                description,
                img,
                crew_id
            });
            return res.status(201).json({"message": "Prêmio Cadastrado!!"});
        } catch(err) {
            return res.json({"message": err.message});
        }
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req,res) {
		try{
			let {award} = req.body;   
			let confirmation = await knex('awards').where({"name": award}).delete();
			return res.json({'message': confirmation});
		} catch(err) {
			return res.json({"message": err.message})
		}
    }

}