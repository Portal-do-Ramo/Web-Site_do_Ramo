const knex = require('../database');
const {v4} = require('uuid');

module.exports = {
    async createUser(req, res){
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
                .status(200)
                .json({
                   "message": "Usuário Cadastrado"
                });
        } catch (err) {
            return res
                .status(422)
                .json({"message": "Usuário já cadastrado"}); //melhorar a lógica para usuário já cadastrado
        }
    },

    async index(req, res){
        const users = await knex('users').select('*');
        return res
            .json({'users': users});
    }
}