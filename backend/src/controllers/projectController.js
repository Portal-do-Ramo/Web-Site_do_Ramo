const projectService = require("../services/projectService");

module.exports = {
    async index(req, res) {
        let projects = await projectService.index();
        
        for (const project of projects) {
            project.imageURL = `${req.protocol}://${req.get('host')}/api/uploads/${project.imageURL}`;
            project.logoURL = `${req.protocol}://${req.get('host')}/api/uploads/${project.logoURL}`;
        }

        return res.status(200).json({"projects": projects});
    },
    
    async getByCrewId(req, res) {
        const {crewId} = req.params;
        
        try {
            let projects = await projectService.getByCrewId(crewId);
            return res.json(projects)
        } catch (error) {
            return res.status(422).json({message: error.message});
        }
    },
	
    async create(req, res){ 
        let { name, description, members, crew_name, beginning, ended } = req.body;
        
        try {
            const response = await projectService.create(
                name,
                description,
                members,
                crew_name,
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
}