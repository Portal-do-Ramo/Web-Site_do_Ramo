const bcrypt = require("bcrypt");
const {v4} = require("uuid");

const knex = require("../database");
const authenticate = require("../services/authentication");
const Joi = require("../services/validation");

module.exports = {
    
    async index(req, res){
        const users = await knex('users').select('*');
		
		//ver como tirar a senha nas consultas 

        // user.forEach(user => {
        //     user.password = undefined;
        // });

        return res.status(200).json({'users': users});
    },

    async create(req, res){
        const {name, email, password, role} = req.body;

        if(await knex('users').where({email}).first()){
            return res.status(409).send({error:"User already exists"})
        }

		
        try {
			const {error} = Joi(req.body);
            if(error == null){
				
				const hash = await bcrypt.hash(password, 10)
				
				//tranformar -> senha
                await knex('users').insert({
                    id: v4(),
                    name,
                    email,
                    password: hash,
                    role
                });

                return res
                    .status(201)
                    .json({
                    "message": "Usuário Cadastrado", 
                    });
            }
			return res.status(406).json({"message": error.message});
        } catch (err) {
            return res
                .status(422)
                .json({"message": err.message}); //melhorar a lógica para usuário já cadastrado
        }
    },

    async update(req, res){
        let { id, user } = req.body;
		try {
			await knex("users").update(user).select({id}); //trocar o timestamp do updated_at
			return res.status(200).json({"message": "Usuário atualizado!!"});
		} catch(err){
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

			if(!await bcrypt.compare(password, user.password)){ // implementar lógica do bcrypt
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