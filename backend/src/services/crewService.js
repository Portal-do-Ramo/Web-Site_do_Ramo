const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async index() {
        let crews = await knex("crews").select();
        return crews;
    },

    async show(id) {
        let crew = await knex("crews").select().where({id});
        return crew;
    }, 

    async create(name, about, image) {
        await knex("crews").insert({
            id: v4(),
            name, 
            about,
            image
        });
    },

    async update(id, crew) {
        await knex("crew").where({id}).update(crew);
    },

    async delete(crew) {
        let confirmation = await knex("crews").where({"name": crew}).delete();
        return confirmation;
    }

}