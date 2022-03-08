const bcrypt = require("bcrypt");
const userService = require("../services/userService");
const authenticate = require("../services/authentication");

module.exports = {  
    async index(req, res) {
        const users = await userService.index();
        return res.status(200).json({users: users});
    },

    async create(req, res) {
        const {name, email, password} = req.body;
        
        try {
            const response = await userService.create(name, email, password);
            return res.status(201).json(response); 
        } catch (err) {
            return res
                .status(422)
                .json({message: err.message}); //melhorar a lógica para usuário já cadastrado
        }
    },

    async update(req, res){
        let { id, name, password } = req.body;
        
		try {
            await userService.update(id, name, password);
            return res.status(200).json({message: "Usuário atualizado!!"});
		} catch(err){
			return res.status(405).json({message: err.message});
		}
    },

    async delete(req, res){
        let {id} = req.body;
        try {
            let response = await userService.delete(id);
            return res.json(response);
        } catch(err) {
            return res.status(405).json({message: err.message});
        }
    },

    // Mover isso pra um sessionController.
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