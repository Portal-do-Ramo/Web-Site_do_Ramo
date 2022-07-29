const knex = require('../database');
const {v4} = require('uuid');
const fs = require("fs");

module.exports = {
    async index() {
        let crews = await knex("crews").select("id", "name", "about", "imageURL");
        return crews;
    },

    async getCrewInformation(id) {
        const crew = await knex("crews").select("id", "name", "about", "imageURL").where({id}).first();
        
        if(!crew) {
            throw new Error("Equipe não existe!");
        }
        
        return crew;
    },

    async create(name, about) {
        let crew = await knex("crews").where({name}).first();
    
        if(crew){
            throw new Error("Equipe já existe!");
        }

        await knex("crews").insert({
            id: v4(),
            name, 
            about,
            imageURL: name.toLowerCase() + "_avatar.png"
        });

        return {message: "Equipe criada!"}
    },

    async update(id, crew) {
        let Crew = await knex("crews").where({id}).first();
        
        if (!Crew){
            throw new Error("Equipe não existe!");
        }

        await knex("crews").where({id}).update({
            ...crew,
            imageURL: `${crew.name}_avatar.${Crew.imageURL.split(".")[1]}`
        });

        if (fs.existsSync(`./uploads/${Crew.imageURL}`))
            fs.rename(
                `./uploads/${Crew.imageURL}`, 
                `./uploads/${crew.name}_avatar.${Crew.imageURL.split(".")[1]}`,
                () => {}
            );

        return {message: "Equipe atualizada!"}
    },

    async delete(id) {
        let crew = await knex("crews").where({id}).first();

        if(!crew){
            throw new Error("Equipe não existe!");
        }

        if (fs.existsSync(`./uploads/${crew.imageURL}`))
            fs.unlinkSync(`./uploads/${crew.imageURL}`);

        let confirmation = await knex("crews").where({id}).delete();

        if(confirmation > 1) {
            return {message: "Equipes deletadas!"};
        }

            
        return {message: "Equipe deletada!"};
    }
}