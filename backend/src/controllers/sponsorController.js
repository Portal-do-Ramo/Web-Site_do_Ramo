const knex = require('../database');
const {v4} = require('uuid');

module.exports = {

   async index(req, res){
		let sponsors = await knex('sponsors').select('*');
        return res.status(200).json(sponsors);
    },

    async create(req, res){
        let { name, img, link } = req.body;
        try{
            await knex("sponsors").insert({
                id: v4(), 
				name,
                img, 
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
			let confirmation = await knex('sponsor').where({"name": sponsor}).delete();
			return res.status(200).json({'message': confirmation});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	}
}