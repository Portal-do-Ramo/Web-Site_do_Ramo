const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const authenticate = require("../services/authentication");
const Joi = require("joi");
const mailer = require("../services/nodemailer");

const validation = (data) => {
    const user = Joi.object({
        name: Joi.string().min(3).required(),    
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(8).pattern(new RegExp("^[a-zA-z0-9]{3,30}$")).required()     
    });

    try {
        return user.validate(data);
    } catch(err) {
        return err.message;
    }
}

module.exports = {
    
    async index(req, res){
        const users = await userService.index();
        return res.status(200).json({'users': users});
    },

    async create(req, res){
        const {name, email, password} = req.body;
        const user = await userService.show(email);
        if(user){
            return res.status(409).send({error:"User already exists"});
        }

        try {
			const {error} = validation(req.body);
            if(error == null){
				
				const hash = await bcrypt.hash(password, 10);
				
				//tranformar -> senha
                await userService.create(name, email, hash);

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
            const {error, value} = validation(user);
            
            if(error == null){
                const hash = await bcrypt.hash(value.password, 10);
                await userService.update(id, value.name, hash);
                return res.status(200).json({"message": "Usuário atualizado!!"});
            }
            return res.status(406).json({"message": error.message});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    },

    async delete(req, res){
        let {id} = req.body;
        try {
            let confirmation = await userService.delete(id);
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
            const user = await userService.show(email);
            
			if(!user) { 	// Verificar os status code.
				return res.status(401).json({"message": "Email não existe"});
			}

			if(!await bcrypt.compare(password, user.password)){ // implementar lógica do bcrypt
				return res.status(401).json({"message": "Senha inválida"});
			}
	
			const token = authenticate(user.name, email); //ver se precisa de await 
			return res
				.status(200)
                .header('auth-token', token) // ler sobre o método
				.json({"token": token});

        } catch(err) {
            return res.json({"message": err.message});
		}
		
	}
}