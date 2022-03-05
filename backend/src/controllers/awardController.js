const awardService = require("../services/awardService");
const crewService = require("../services/crewService");

module.exports = {

    async index(req,res) {
        let awards = await awardService.index();
        return res.status(200).json(awards);
    },
    
    async show(req,res) { //mostrar só um
        let { id } = req.params;
		let award = await awardService.show(id);
        return res.status(200).json(award);
    },

    async create(req,res) {
		let { name, description, crew_name } = req.body;
		let { id: crew_id } = await crewService.getCrew(crew_name).first();
        try {
            await awardService.create(name, description, crew_id);
            return res.status(201).json({"message": "Prêmio Cadastrado!!"});
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res) {
        let { id, award } = req.body; //talvez o award possa ser um json com todas as informações do objeto
		try {
			await awardService.update(id, award);
			return res.status(200).json({"message": "Prêmio atualizado!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    },

    //Padronizar o parâmetro a ser passado para o delete. Alguns controllers estão utilizando ID's, outros o nome do objeto desejado
    async delete(req,res) {
        let { award } = req.body;  
		try{
			let confirmation = await awardService.delete(award);
            if(confirmation > 1){
                return res.status(200).json({"message": "Prêmios foram deletados"});
            } 
            return res.status(200).json({"message": "Prêmio foi deletado"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
    }

}