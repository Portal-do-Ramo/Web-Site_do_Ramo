const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let sponsors = await knex('sponsors').select('*');
        return sponsors;
    },

    async create(name, image, link){
        await knex("sponsors").insert({
            id: v4(), 
            name,
            image, 
            link
        });
    },

    async update(id, sponsor){
        await knex("sponsors").where({id}).update(sponsor); //trocar o timestamp do updated_at
    },

    async delete(sponsor){
        let confirmation = await knex('sponsors').where({"name": sponsor}).delete();
        return confirmation;
    }

}