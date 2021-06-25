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
        try {
            let { deposition, data, update } = req.body;
            let confirmation = await knex("depositions").where({ deposition }).update({ data, update });
            return res.status(200).json({ "message": confirmation });
        } catch (err) {
            return res.status(405).json({ "message": "Something was wrong. Failed patch operation." });
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