const knex = require('../database');
const {v4} = require('uuid');
const authenticate = require('../services/authentication');

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
                   "message": "Usuário Cadastrado", 
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
        let {id} = req.body;
        try {
            let confirmation = await knex("users").where({id}).delete();
			if(confirmation > 1) {
				return res.status(200).json({"message": "Usuários deletados"});
			}
            return res.status(200).json({"message": "Usuário deletado"});
        } catch(err) {
            return res.status(405).json({"message": err.message});
        }
    },

	async login(req, res){
		const {email, password} = req.body;

        try {
            const user = await knex("users").where({email}).first();
			if(!user.email) { 	// Verificar os status code.
				return res.status(401).json({"message": "Email não existe"});
			}
			if(password !== user.password){ // implementar lógica do bcrypt
				return res.status(401).json({"message": "Senha inválida"});
			}
			
			const token = await authenticate(user.name, email, user.role); //ver se precisa de await 

			return res
				.status(200)
                .header('auth-token', token) // ler sobre o método
				.send("Usuario logado");

        } catch(err) {
            return res.json({"message": err.message});
		}
		
	}
}