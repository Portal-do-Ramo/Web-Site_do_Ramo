const {v4} = require("uuid");
const knex = require("../database");

module.exports = {
    async index(){
        const users = await knex("users").select("name", "email");
        return users;
    },
    
    async show(email){
        const user = await knex("users").where({email}).first()
        return user;
    },

    async create(name, email, hash){
        await knex("users").insert({
            id: v4(),
            name,
            email,
            password: hash,
        });
    },

    async update(id, name, password){
        await knex("users").where({id}).update({name, password}); //trocar o timestamp do updated_at
    },

    async delete(id){
        let confirmation = await knex("users").where({id}).delete()
        return confirmation;
    }

}