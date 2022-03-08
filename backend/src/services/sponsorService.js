const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let sponsors = await knex('sponsors').select('*');
        return sponsors;
    },

    async create(name, image, link) {
        try {
            await knex("sponsors").insert({
                id: v4(), 
                name,
                image, 
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

    async delete(sponsor){
        try {
            let confirmation = await knex('sponsors').where({"name": sponsor}).delete();

            if (confirmation > 1) {
				return { message: "Patrocinadores deletados" };
			}

            return {message: "Patrocinador deletado!"};
        } catch (error) {
            throw new Error(error.message);
        }
    }

}