const awardService = require("../services/awardService");

module.exports = {
    async index(req,res) {
        let awards = await awardService.index();
        return res.status(200).json(awards);
    },
    
    async create(req,res) {
		let { name, description, crew_name } = req.body;

        try {
            const response = await awardService.create(name, description, crew_name);
            return res.status(201).json(response);
        } catch(err) {
            return res.status(422).json({message: err.message});
        }
    },

    async update(req, res) {
        let { id, award } = req.body; //talvez o award possa ser um json com todas as informações do objeto
		
        try {
			await awardService.update(id, award);
			return res.status(200).json({message: "Prêmio atualizado!!"});
		} catch(err){
			return res.status(405).json({message: err.message});
		}
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req,res) {
        let { award } = req.body;  
		
        try {
			let response = await awardService.delete(award);
            return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
    }
}