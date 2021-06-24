const {v4} = require("uuid");

const knex = ("../database");
const crewServices = require('../services/crewReferences');

module.exports = {
    async index(req, res){
        let roles = await knex("roles");
        return res.status(200).json(roles);
    },

    async create(req, res){
        let { name, number, crew_name } = req.body;
        let { id: crew_id } = await crewServices.getCrew(crew_name).first();
        try{
            knex("roles").insert({
                id: v4(),
                name, 
                number,
                crew_id
            });
            return res.status(201).json({"message": "Cargo criado"});
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

	async update(req,res) {
		let { role, data, update } = req.body;
		try{
			await knex("roles").where(role).update({data,update});
			return res.status(200).json({"message": "Cargo atualizado!"});
		} catch(err) {
			return res.status(405).json({"message": err.message})
		}
	},

	async delete(req,res) {
        let {role} = req.body; 
		try{	  
			let confirmation = await knex('roles').where({"name": role}).delete();
			return res.status(200).json({'message': confirmation});
		} catch(err) {
			return res.status(405).json({"message": err.message})
		}
    }
}
