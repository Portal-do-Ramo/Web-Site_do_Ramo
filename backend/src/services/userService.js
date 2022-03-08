const {v4} = require("uuid");
const knex = require("../database");
const Joi = require("joi");

module.exports = {
    async index() {
        const users = await knex("users").select("name", "email");
        return users;
    },

    async create(name, email, password) {
        try {
            const userValidation = Joi.object({
                name: Joi.string().min(3).required(),    
                email: Joi.string().min(6).email().required(),
                password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required()     
            });
        
            userValidation.validate({name, email, password});
            
            const user = await userService.show(email);
            
            if (user) {
                throw new Error("User already exists");
            }
            
            const hash = await bcrypt.hash(password, 10);
            
            await knex("users").insert({
                id: v4(),
                name,
                email,
                password: hash,
            });

            return {message: "Usuário Cadastrado"};

        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id, name, password) {
        try {
            const userValidation = Joi.object({
                name: Joi.string().min(3),
                password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$"))    
            });
        
            userValidation.validate({name, password});

            const hash = await bcrypt.hash(password, 10);

            await knex("users").where({id}).update({name, hash}); //trocar o timestamp do updated_at
            return {message: "Usuário atualizado!"};
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async delete(id) {
        try {
            let confirmation = await knex("users").where({id}).delete();
            
            if (confirmation > 1) {
				return {message: "Usuários deletados"};
			}

            return {message: "Usuário deletado"};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}