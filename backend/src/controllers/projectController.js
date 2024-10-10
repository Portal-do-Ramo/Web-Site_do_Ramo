const projectService = require('../services/projectService');
const { bucket } = require('../database/firebase');

module.exports = {
	async index(req, res) {
		let projects = await projectService.index();
        
		for (const project of projects) {
			project.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.imageURL}?t=${Date.now()}`;
			project.logoURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.logoURL}?t=${Date.now()}`;
		}

		return res.status(200).json({'projects': projects});
	},

	async getProject(req, res) {
		const {id} = req.params;
        
		try {
			let project = await projectService.getProject(id);

			project.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.imageURL}?t=${Date.now()}`;
			project.logoURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.logoURL}?t=${Date.now()}`;
            
			return res.json(project);
		} catch (error) {
			return res.status(422).json({message: error.message});
		}
	},
    
	async getByCrewId(req, res) {
		const {crewId} = req.params;
        
		try {
			let projects = await projectService.getByCrewId(crewId);

			for (const project of projects) {
				project.imageURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.imageURL}?t=${Date.now()}`;
				project.logoURL = `https://storage.googleapis.com/${bucket.name}/uploads/${project.logoURL}?t=${Date.now()}`;
			}
            
			return res.json(projects);
		} catch (error) {
			return res.status(422).json({message: error.message});
		}
	},
	
	async create(req, res){ 
		let { name, description, members, crew_id, beginning, ended } = req.body;
        
		try {
			const response = await projectService.create(
				name,
				description,
				members,
				crew_id,
				beginning,
				ended
			);

			return res.status(201).json(response);
		} catch (error) {
			return res.status(422).json({message: error.message});
		}
	},

	async update(req, res){
		let { project } = req.body;
		let { id } = req.params;

		try {
			const response = await projectService.update(id, project);
			return res.status(200).json(response);
		} catch(err){
			return res.status(405).json({message: err.message});
		}
	},
    
	async delete(req, res){
		let {id} = req.params;
        
		try{
			let response = await projectService.delete(id);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	}
};