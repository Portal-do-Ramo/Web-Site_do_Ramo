const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let crews = await knex("crews").select();
        return crews;
    },

    async show(id) {
        try {
            let crew = await knex("crews").select().where({id});
            return crew;
        } catch (error) {
            return new Error(error.message);
        }
    }, 

    async create(name, about, image) {
        try {
            await knex("crews").insert({
                id: v4(),
                name, 
                about,
                image
            });

            return {message: "Equipe criada!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, crew) {
        try {
            await knex("crew").where({id}).update(crew);
            return {message: "Equipe atualizada!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async delete(crew) {
        try {
            let confirmation = await knex("crews").where({"name": crew}).delete();

            if(confirmation > 1) {
                return {message: "Equipes deletadas!"};
            }
            
            return {message: "Equipe deletada!"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getCrew(crew_name){
        try {
            let crew = knex('crews').where({"name": crew_name}).select().first();
            return crew;
        } catch (error) {
            throw new Error(error.message);
        }
	}	
    
}