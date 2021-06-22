const knex = require('../database');
const {v4} = require('uuid');

module.exports = {

   async index(req, res){
		let sponsors = await knex('sponsors').select('*');
        return res.json(sponsors);
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
            return res.status(200).json({"message": "Patrocinador criado!!!"});
        } catch(err){
            return res.status(400).json({"message": err.message});
        }
    },

    async update(req, res){
        let { sponsor, data, update } = req.body;
        try{
            await knex("sponsors").where(sponsor).update({data, update});
            return res.status(200).json({"message": "Patrocinador atulizado!!!"});
        } catch(err){
            return res.status(400).json({"message": err.message});
        }
    },

	async delete(req, res){
		try {
			let { sponsor } = req.body;
			let confirmation = await knex('sponsor').where({"name": sponsor}).delete();
			return res.json({'message': confirmation});
		} catch(err) {
			return res.json({"message": err.message});
		}
	}
}