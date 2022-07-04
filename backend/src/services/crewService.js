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
    
        if(crew){
            throw new Error("Equipe já existe!");
        }

        await knex("crews").insert({
            id: v4(),
            name, 
            about,
            imageURL
        });

        return {message: "Equipe criada!"}
    },

    async update(id, crew) {
        let Crew = await knex("crews").where({id}).first();
        if(!Crew){
            throw new Error("Equipe não existe!");
        }

        await knex("crews").where({id}).update(crew);
        return {message: "Equipe atualizada!"}
        
    },

    async delete(id) {

        let crew = await knex("crews").where({id}).first();
        if(!crew){
            throw new Error("Equipe não existe!");
        }

        let confirmation = await knex("crews").where({id}).delete();
        if(confirmation > 1) {
            return {message: "Equipes deletadas!"};
        }
            
        return {message: "Equipe deletada!"};
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