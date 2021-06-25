const knex = require('../database');
const {v4} = require('uuid');

module.exports = {

   async index(req, res){
		let sponsors = await knex('sponsors').select('*');
        return res.status(200).json(sponsors);
    },

    async create(req, res){
        let { name, image, link } = req.body;
        try{
            await knex("sponsors").insert({
                id: v4(), 
				name,
                image, 
                link
            });
            return res.status(201).json({"message": "Patrocinador criado!!!"});
        } catch(err) {
            return res.status(422).json({"message": err.message});
        }
    },

    async update(req, res){
        let { sponsor, data, update } = req.body;
        try{
            await knex("sponsors").where(sponsor).update({data, update});
            return res.status(200).json({"message": "Patrocinador atualizado!!!"});
        } catch(err){
            return res.status(405).json({"message": err.message});
        }
    },

	async delete(req, res){
        let { sponsor } = req.body;
		try {
			let confirmation = await knex('sponsors').where({"name": sponsor}).delete();
			if(confirmation > 1) {
				return res.status(200).json({'message': "Patrocinadores deletados"});
			}
			return res.status(200).json({'message': "Patrocinador deletado"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	}
}