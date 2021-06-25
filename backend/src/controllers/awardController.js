const { v4 } = require("uuid");
const knex = require("../database");
const crewServices = require("../services/crewReferences");

module.exports = {

    async index(req,res) { //
        let awards = await knex("awards")
        return res.status(200).json(awards);
    },
    
    async show(req,res) { //mostrar só um
        let { id } = req.params;
		let award = await knex("awards").select().where({id});
        return res.status(200).json(award);
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
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res) {
        let { award, data, update } = req.body;
        try {
            await knex("award").where(award).update({data, update});
            return res.status(200).json({"message": "Prêmio atualizado!!!"});
        } catch(err) {
            return res.status(405).json({"message": err.message});
        }
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req,res) {
        let { award } = req.body;  
		try{
			let confirmation = await knex("awards").where({"name": award}).delete();
            if(confirmation > 1){
                return res.status(200).json({"message": "Prêmios foram deletados"});
            } 
            return res.status(200).json({"message": "Prêmio foi deletado"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
    }

}