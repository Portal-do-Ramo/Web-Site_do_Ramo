const crewService = require('../services/crewService');
const projectService = require('../services/projectService');
const awardService = require('../services/awardService');
const { bucket } = require('../database/firebase');
require('dotenv').config();
const isLocal = process.env.IS_LOCAL;

module.exports = {
	
	async index(req, res) {
		let crews = await crewService.index();
		
		if (isLocal) {
			for (const crew of crews) {
				crew.imageURL = `${process.env.BASE_URL}/uploads/${crew.imageURL}`;
			}

			return res.status(200).json(crews);
		}
		
		for (const crew of crews) {
			crew.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${crew.imageURL}?t=${Date.now()}`;
		}

		return res.status(200).json(crews);
	},

	async getCrew(req, res) {
		const { id } = req.params;

		try {
			let crew = await crewService.getCrew(id);

			if (isLocal) {
				crew.imageURL = `${process.env.BASE_URL}/uploads/${crew.imageURL}`;
				return res.json(crew);
			}

			crew.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${crew.imageURL}?t=${Date.now()}`;
            
			return res.json(crew);
		} catch (error) {
			return res.status(422).json({message: error.message});
		}
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
			return res.status(422).json({message: err.message});
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
            
			if (isLocal) { 
				for (const crew of crews) {
					const projects = await projectService.getByCrewId(crew.id);
					const awards = await awardService.getByCrewId(crew.id);
	
					for (const project of projects) {
						project.imageURL = `${process.env.BASE_URL}/uploads/${project.imageURL}`;
						project.logoURL = `${process.env.BASE_URL}/uploads/${project.logoURL}`;
					}
	
					crew.imageURL = `${process.env.BASE_URL}/uploads/${crew.imageURL}`;
	
					response.push({crew, projects, awards});
				}

				return res.status(200).json(response);
			}

			for (const crew of crews) {
				const projects = await projectService.getByCrewId(crew.id);
				const awards = await awardService.getByCrewId(crew.id);

				for (const project of projects) {
					project.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.imageURL}?t=${Date.now()}`;
					project.logoURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.logoURL}?t=${Date.now()}`;
				}

				crew.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${crew.imageURL}?t=${Date.now()}`;

				response.push({crew, projects, awards});
			}
            
			return res.status(200).json(response);
            
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
};