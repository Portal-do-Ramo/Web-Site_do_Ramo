const pseService = require("../services/pseService");

let jobScheduled = null;

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

	async schedulePSE(req, res) {
		const { startDate, endDate } = req.body;

		try {
			const response = await pseService.schedulePSE(startDate, endDate);
			jobScheduled = response;
			return res.status(200).json({ message: "service scheduled to " + endDate });
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async updateSchedulePSE(req, res) {
		const { startDate, endDate } = req.body;

		try {
			jobScheduled.cancel();
			const response = await pseService.updateSchedulePSE(startDate, endDate);
			jobScheduled = response;
			return res.status(200).json({ message: "service rescheduled to " + endDate});
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async deleteSchedulePSE(req, res) {
		try {
			const response = await pseService.deleteSchedulePSE(jobScheduled);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}		
	},
	
	async checkSchedulePSE() {
		try {
			const response = await pseService.checkSchedulePSE();
			jobScheduled = response;
			
			console.log("🆗 service scheduled!");
		} catch (error) {
			console.log(error.message);
		}
	}
}

