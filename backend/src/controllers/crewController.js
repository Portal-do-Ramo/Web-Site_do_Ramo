const crewService = require("../services/crewService");
const projectService = require("../services/projectService");
const awardService = require("../services/awardService");
const knex = require('../database');

module.exports = {

   async index(req, res) {
        let crews = await crewService.index();
        return res.status(200).json(crews);
    },

    async create(req, res) {
        let { name, about } = req.body;
        try{
            const response = await crewService.create(name, about);
            return res.status(201).json(response);
        } catch(err){
            return res.status(422).json({message: err.message});
        }
    },

    async update(req, res) {
		let { crew } = req.body;
        let { id } = req.params;

		try {
            const response = await crewService.update(id, crew);
			return res.status(200).json(response);
		} catch(err){
			return res.status(405).json({message: err.message});
        }
    },

	async delete(req, res) {
		let { id } = req.params;
		
        try {
			let response = await crewService.delete(id);
            return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

    async getCrewsAllData(req, res) {
        try {
            const response = [];
            const crews = await crewService.index();
            
            for (const crew of crews) {
                const projects = await projectService.getByCrewId(crew.id);
                const awards = await awardService.getByCrewId(crew.id)
                response.push({crew, projects, awards});
            }
            
            return res.json(response);
            
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}