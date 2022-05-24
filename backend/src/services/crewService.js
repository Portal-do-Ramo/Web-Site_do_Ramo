const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let crews = await knex("crews").select("id", "name", "about", "imageURL");
        return crews;
    },

    async create(name, about) {
        let imageURL = name.toLowerCase() + "_avatar.png";
        let crew = await knex("crews").where({name}).first();
        
        try {
            if(crew)
                return {message: "Equipe já existe!"}

            await knex("crews").insert({
                id: v4(),
                name, 
                about,
                imageURL
            });

            return {message: "Equipe criada!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, crew) {
        try {
            await knex("crews").where({id}).update(crew);
            return {message: "Equipe atualizada!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async delete(id) {
        try {
            let confirmation = await knex("crews").where({id}).delete();

            if(confirmation > 1) {
                return {message: "Equipes deletadas!"};
            }
            
            return {message: "Equipe deletada!"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getCrewByName(crew_name){
        try {
            let crew = knex("crews").select().where({"name": crew_name}).first();
            return crew;
        } catch (error) {
            throw new Error(error.message);
        }
	}	
}