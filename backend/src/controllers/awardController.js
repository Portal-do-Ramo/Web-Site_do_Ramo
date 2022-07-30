const awardService = require("../services/awardService");

module.exports = {
    async index(req, res) {
        let awards = await awardService.index();
        return res.status(200).json(awards);
    },

    async getAward(req, res) {
        const { id } = req.params;
        
        try {
            let award = await awardService.getAward(id);
            return res.json(award);
        } catch (error) {
            return res.status(422).json({ message: error.message });
        }
    },

    async getByCrewId(req, res) {
        const { crewId } = req.params;
        
        try {
            let awards = await awardService.getByCrewId(crewId);
            return res.json(awards);
        } catch (error) {
            return res.status(422).json({ message: error.message });
        }
    },
    
    async create(req, res) {
		let { name, placing, year, crew_id } = req.body;

        try {
            const response = await awardService.create(name, placing, year, crew_id);
            return res.status(201).json(response);
        } catch(err) {
            return res.status(422).json({message: err.message});
        }
    },

    async update(req, res) {
        let { award } = req.body;
		let { id } = req.params;
        
        try {
			const response = await awardService.update(id, award);
			return res.status(200).json(response);
		} catch(err){
			return res.status(405).json({message: err.message});
		}
    },

    async delete(req, res) {
        let { id } = req.params;  
		
        try {
			let response = await awardService.delete(id);
            return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
    }
}