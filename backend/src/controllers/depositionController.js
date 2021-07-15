const knex = require("../database");
const { v4 } = require("uuid");

module.exports = {

    async index(req, res) {
        let depositions = await knex("depositions");
        return res.status(200).json(depositions);
    },

    async create(req, res) {
		let { name, crew, text } = req.body;
        try {
            let deposition = await knex("depositions").insert({
                id: v4(),
                name,
                crew,
                text
            });
            return res.status(201).json(deposition);
        } catch (err) {
            return res.status(422).json({ "message": err.message });
        }
    },

    async update(req, res) {
        let { id, deposition } = req.body;
		try {
			await knex("depositions").update(deposition).select({id}); //trocar o timestamp do updated_at
			return res.status(200).json({"message": "Depoimento atualizado!!"});
		} catch(err){
			return res.status(405).json({"message": err.message});
		}
    }, 

    async delete(req, res) {
        try {
            let { id } = req.params;
            let confirmation = await knex("depositions").where({ id }).delete();
			if(confirmation > 1){
				return res.status(200).json({ "message": "Depoimentos deletados"});
			}
            return res.status(200).json({ "message": "Depoimento deletado"});
        } catch (err) {
            return res.status(405).json({ "message": err.message });
        }
    }
}