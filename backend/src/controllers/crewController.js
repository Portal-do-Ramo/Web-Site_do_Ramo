const crewService = require("../services/crewService");

module.exports = {

    /* O carrossel precisa de dinamismo na lógica do Back-end, a ideia é colocar um argumento obrigatório para conseguir realizar a troca das informações de acordo com a equipe escolhida no carrossel */

   async index(req, res) {
        let crews = await crewService.index();
        return res.status(200).json(crews);
    },

	async show(req,res) {
		let {id} = req.params;

        try {
            let crew = await crewService.show(id);
            return res.status(200).json(crew);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
	},

    async create(req, res) {
        let { name, about, image } = req.body;

        try{
            const response = await crewService.create(name, about, image);
            return res.status(201).json(response);
        } catch(err){
            return res.status(422).json({message: err.message});
        }
    },

    async update(req, res) {
		let { id, crew } = req.body;

		try {
            const response = await crewService.update(id, crew);
			return res.status(200).json(response);
		} catch(err){
			return res.status(405).json({message: err.message});
        }
    },

	async delete(req, res) {
		let { crew } = req.body;
		try {
			let response = await crewService.delete(crew);
            return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	} 
}