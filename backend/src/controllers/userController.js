const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    
    async index(req, res){
        const users = await knex('users').select('*');
        return res.status(200).json({'users': users});
    },

    async create(req, res){
        const {name, email, password, role} = req.body;
    
        try {
            await knex('users').insert({
                id: v4(),
                name,
                email,
                password,
                role
            });
            return res
                .status(201)
                .json({
                   "message": "Usuário Cadastrado"
                });
        } catch (err) {
            return res
                .status(422)
                .json({"message": "Usuário já cadastrado"}); //melhorar a lógica para usuário já cadastrado
        }
    },

    async update(req, res){
        let {user, data, update} = req.body;
        try {
            await knex("users").where(user).update({data, update});
            return res.status(200).json({"message": "Usuário atualizado"});
        } catch(err) {
           return res.status(405).json({"message": err.message}); 
        }
    },

    async delete(req, res){
        let {user} = req.body;
        try {
            let confirmation = await knex("users").where({user}).delete();
            return res.status(200).json({"message": confirmation});
        } catch(err) {
            return res.status(405).json({"message": err.message});
        }
    }
}