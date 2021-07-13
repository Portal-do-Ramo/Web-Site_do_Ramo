const {v4} = require("uuid");

const knex = require("../database");
const crewServices = require('../services/crewReferences');

module.exports = {
    async index(req, res){
        let roles = await knex("roles");
        return res.status(200).json({"roles": roles});
    },

    async create(req, res){
        let { name, number, crew_name } = req.body;
        let { id } = await crewServices.getCrew(crew_name).first();
        try{
        	await knex("roles").insert({
                id: v4(),
                name, 
                number,
                crew_id: id
            });
            return res.status(201).json({"message": "Cargo criado"});
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

	async update(req,res) {
		let { id, role } = req.body;
		try {
			await knex("roles").update(role).select({id}); //trocar o timestamp do updated_at
			return res.status(200).json({"message": "Cargos atualizados!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
	},

	async delete(req,res) {
        let {role} = req.body; 
		try{	  
			let confirmation = await knex('roles').where({"name": role}).delete();
			if(confirmation > 1) {
				return res.status(200).json({'message': "Cargos deletados"});
			}
			return res.status(200).json({'message': "Cargo deletado"});
		} catch(err) {
			return res.status(405).json({"message": err.message})
		}
    }
}
