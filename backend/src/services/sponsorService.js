const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let sponsors = await knex('sponsors').select('*');
        return sponsors;
    },

    async create(name, link) {
        let imageURL = name.toLowerCase() + "_avatar.png";
        try {
            await knex("sponsors").insert({
                id: v4(), 
                name,
                imageURL, 
                link
            });

            return {message: "Patrocinador criado!"}
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, sponsor) {
        try {
            await knex("sponsors").where({id}).update(sponsor); //trocar o timestamp do updated_at
            return {message: "Patrocinador atualizado!"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async delete(id){
        try {
            let confirmation = await knex('sponsors').where({id}).delete();

            if(confirmation > 1){
                return {message: "Patrocinadores foram deletados"};
            } 

            return {message: "Patrocinador deletado!"};
        } catch (error) {
            throw new Error(error.message);
        }
    }

}