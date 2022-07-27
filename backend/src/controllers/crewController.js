const crewService = require("../services/crewService");
const projectService = require("../services/projectService");
const awardService = require("../services/awardService");

module.exports = {

   async index(req, res) {
        let crews = await crewService.index();

        for (const crew of crews) {
            crew.imageURL = `${req.protocol}://${req.get('host')}/api/uploads/${crew.imageURL}`;
        }

        return res.status(200).json(crews);
    },

    async getCrewInformation(req, res) {
        const { id } = req.params;

        try {
            let crew = await crewService.getCrewInformation(id);

            crew.imageURL = `${req.protocol}://${req.get('host')}/api/uploads/${crew.imageURL}`;
            
            return res.json(crew);
        } catch (error) {
            return res.status(422).json({message: error.message});
        }
    },

    async create(req, res) {
        let { name, about, imageURL } = req.body;

        if (!imageURL) {
            imageURL = name.toLowerCase() + "_avatar.png";
        }

        try{
            const response = await crewService.create(name, about, imageURL);
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
            
            for (const crew of crews) {
                const projects = await projectService.getByCrewId(crew.id);
                const awards = await awardService.getByCrewId(crew.id);

                for (const project of projects) {
                    project.imageURL = `${req.protocol}://${req.get('host')}/api/uploads/${project.imageURL}`;
                    project.logoURL = `${req.protocol}://${req.get('host')}/api/uploads/${project.logoURL}`;
                }

                crew.imageURL = `${req.protocol}://${req.get('host')}/api/uploads/${crew.imageURL}`;

                response.push({crew, projects, awards});
            }
            
            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}