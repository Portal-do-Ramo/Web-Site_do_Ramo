const crewService = require("../services/crewService");

module.exports = {

    /* O carrossel precisa de dinamismo na lógica do Back-end, a ideia é colocar um argumento obrigatório para conseguir realizar a troca das informações de acordo com a equipe escolhida no carrossel */

   async index(req, res) {
        let crews = await crewService.index();
        return res.status(200).json(crews);
    },

	async show(req,res) {
		let {id} = req.params;
		let crew = await crewService.show(id);
		return res.status(200).json(crew);
	},

    async create(req, res) {
        let { name, about, image } = req.body;
        try{
            await crewService.create(name, about, image);
            return res.status(201).json({"message": "Equipe criada!!!"});
        } catch(err){
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res) {
		let { id, crew } = req.body;
		try {
            await crewService.update(id, crew);
			return res.status(200).json({"message": "Equipe atualizada!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
        }
    },

	async delete(req, res) {
		let { crew } = req.body;
		try {
			let confirmation = await crewService.delete(crew);
            if(confirmation > 0) {
                return res.status(200).json({"message": "Equipes deletadas"});
            }
            else{
                return res.status(202).json({"message": "Equipe não existente"});
            }
            
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	} 
}