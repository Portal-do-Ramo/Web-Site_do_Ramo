const {v4} = require("uuid");
const knex = require("../database");
const Joi = require("joi");
const bcrypt = require("bcrypt");

module.exports = {
    async index() {
        const users = await knex("users").select("name", "email", "admin", "id");
        return users;
    },

    async create(name, email, password, admin) {
        
        const userValidation = Joi.object({
            name: Joi.string().min(3).required(),    
            email: Joi.string().min(6).email().required(),
            password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required(),
            admin: Joi.boolean().default(false)
        });
        
        const {error} = userValidation.validate({name, email, password, admin});
        if (error){
            throw new Error(error.message);
        }

        const user = await knex("users").select("name").where({email}).first();
        if (user) {
            throw new Error("Usuário já existe!");
        }
            
        const hash = await bcrypt.hash(password, 10);
            
        await knex("users").insert({
            id: v4(),
            name,
            email,
            password: hash,
            admin
        });

        return {message: "Usuário Cadastrado"};

    },

    async update(id, name, password) {
        
        const userValidation = Joi.object({
            name: Joi.string().min(3),
            password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$"))    
        });
        
        const {error} = userValidation.validate({name, password});
        if (error){
            throw new Error(error.message);
        }

        const user = await knex("users").select("name").where({id}).first();
        if (!user) {
            throw new Error("Usuário não existe!");
        }

        const hash = await bcrypt.hash(password, 10);

        await knex("users").update({name, password: hash}).where({id});
        return {message: "Usuário atualizado!"};
    },

    async delete(id) {
        
        let user = await knex("users").select("name").where({id}).first();
        if (!user) {
            throw new Error("Usuário não existe!");
        }

        let confirmation = await knex("users").where({id}).delete();  
        if (confirmation > 1) {
			return {message: "Usuários deletados"};
		}

        return {message: "Usuário deletado"};
    }
}