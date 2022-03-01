const sponsorService = require("../services/sponsorService");

module.exports = {

   async index(req, res){
		let sponsors = await sponsorService.index();
        return res.status(200).json(sponsors);
    },

    async create(req, res){
        let { name, image, link } = req.body;
        try{
            sponsorService.create(name, image, link);
            return res.status(201).json({"message": "Patrocinador criado!!!"}); 
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res){
		let { id, sponsor } = req.body;
		try {
			await sponsorService.update(id, sponsor);
			return res.status(200).json({"message": "Patrocinador atualizado!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    },

	async delete(req, res){
        let { sponsor } = req.body;
		try {
			let confirmation = await sponsorService.delete(sponsor);
			if(confirmation > 1) {
				return res.status(200).json({'message': "Patrocinadores deletados"});
			}
			return res.status(200).json({'message': "Patrocinador deletado"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	}
}