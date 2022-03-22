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
        let { award } = req.body;
		let { id } = req.params;

        try {
			await awardService.update(id, award);
			return res.status(200).json({message: "Prêmio atualizado!!"});
		} catch(err){
			return res.status(405).json({message: err.message});
		}
    },

    async delete(req,res) {
        let { id } = req.params;  
		
        try {
			let response = await awardService.delete(id);
            return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
    }
}