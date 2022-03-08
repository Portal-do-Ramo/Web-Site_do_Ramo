const knex = require("../database");
const {v4} = require("uuid");
const crewService = require("./crewService");

module.exports = {
    async index() {
        const awards = await knex("awards").select();
        return awards;
    },

    async show(id) {
        try {
            const award = await knex("awards").select().where({id});
            return award;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async create(name, description, crew_name) {
        try {
            let { crew_id } = await crewService.getCrew(crew_name);

            if (!crew_id) {
                throw new Error("Equipe não existe!");
            }
            
            await knex("awards").insert({
                id: v4(),
                name,
                description,
                crew_id
            });

            return {message: "Prêmio Cadastrado!!"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, award) {
        await knex("awards").where({id}).update(award); //trocar o timestamp do updated_at 
    },

    async delete(award) {
        try {
            let confirmation = await knex("awards").where({"name": award}).delete();

            if(confirmation > 1){
                return {message: "Prêmios foram deletados"};
            } 
            
            return {message: "Prêmio foi deletado"};
        } catch (error) {
            throw new Error(error.message);
        }
    }

}