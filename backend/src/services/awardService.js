const knex = require("../database");
const {v4} = require("uuid");

module.exports = {
    async index(){
        const awards = await knex("awards").select();
        return awards;
    },

    async show(id){
        const award = await knex("awards").select().where({id});
        return award;
    },

    async create(name, description, crew_id){
        await knex("awards").insert({
            id: v4(),
            name,
            description,
            crew_id
        });
    },

    async update(id, award){
        await knex("awards").where({id}).update(award); //trocar o timestamp do updated_at 
    },

    async delete(award){
        let confirmation = await knex("awards").where({"name": award}).delete();
        return confirmation;
    }

}