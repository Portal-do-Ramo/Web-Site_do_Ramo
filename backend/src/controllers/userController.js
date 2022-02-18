const bcrypt = require("bcrypt");
const {v4} = require("uuid");
const knex = require("../database");
const authenticate = require("../services/authentication");
const Joi = require("joi");
const mailer = require("../services/nodemailer");


const validation = (data) => {
    const user = Joi.object({
        name: Joi.string().min(3).required(),    
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required(),
        role: Joi.string().required()           
    });

    try {
        return user.validate(data);
    } catch(err) {
        return err.message;
    }
}

module.exports = {
    
    async index(req, res){
        const users = await knex('users').select('name', 'email', 'role');
        return res.status(200).json({'users': users});
    },

    async create(req, res){
        const {name, email, password, role} = req.body;

        if(await knex('users').where({email}).first()){
            return res.status(409).send({error:"User already exists"})
        }

        try {
			const {error} = validation(req.body);
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

                //await mailer("email_confirmacao", email);

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
	
			const token = authenticate(user.name, email, user.role); //ver se precisa de await 

			return res
				.status(200)
                .header('auth-token', token) // ler sobre o método
				.json({"token": token});

        } catch(err) {
            return res.json({"message": err.message});
		}
		
	}
}