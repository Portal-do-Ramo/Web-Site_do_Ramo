const pseService = require("../services/pseService");

module.exports =  {
	async create(req, res){
		const info = Object.values(req.body);

		try {
			const response = pseService.create(info);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async getSchedulePSE(req, res) {
		try {
			const response = await pseService.getSchedulePSE();
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async schedulePSE(req, res) {
		const { startDate, endDate } = req.body;

		try {
			const response = await pseService.schedulePSE(startDate, endDate);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async updateSchedulePSE(req, res) {
		const { startDate, endDate } = req.body;

		try {
			const response = await pseService.updateSchedulePSE(startDate, endDate);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async deleteSchedulePSE(req, res) {
		try {
			const response = await pseService.deleteSchedulePSE();
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}		
	},
	
	async checkSchedulePSE() {
		try {
			await pseService.checkSchedulePSE();
			console.log("🆗 service scheduled!");
		} catch (error) {
			console.log(error.message);
		}
	}
}

