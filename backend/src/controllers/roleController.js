const {v4} = require("uuid");

const knex = ("../database");
const crewServices = require('../services/crewReferences')

module.exports = {
    async index(req, res){
        let roles = await knex("roles");
        return res.json(roles);
    },

    async create(req, res){
        let {name, number, crew_name} = req.body;
        let { id: crew_id } = await crewServices.getCrew(crew_name).first();
        try{
            knex("roles").insert({
                id: v4(),
                name, 
                number,
                crew_id
            });
        } catch(err) {
            return res.json({"message": err.message});
        }
    },
}
