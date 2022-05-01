const userService = require("../services/userService");

module.exports = {
    async index(req, res) {
        const users = await userService.index();
        return res.status(200).json({users: users});
    },

    async create(req, res) {
        const {name, email, password, admin} = req.body;
        
        try {
            const response = await userService.create(name, email.toLowerCase(), password, admin);
            return res.status(201).json(response); 
        } catch (err) {
            return res
                .status(422)
                .json({message: err.message}); //melhorar a lógica para usuário já cadastrado
        }
    },

    async update(req, res){
        let { name, password } = req.body;
        let { id } = req.params;

		try {
            await userService.update(id, name, password);
            return res.status(200).json({message: "Usuário atualizado!"});
		} catch(err){
			return res.status(405).json({message: err.message});
		}
    },

    async delete(req, res){
        let {id} = req.params;
        
        try {
            let response = await userService.delete(id);
            return res.json(response);
        } catch(err) {
            return res.status(405).json({message: err.message});
        }
    }
}