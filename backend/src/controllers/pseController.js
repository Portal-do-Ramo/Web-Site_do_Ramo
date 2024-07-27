const pseService = require('../services/pseService');

module.exports =  {
	async create(req, res){
		const info = req.body;
		try {
			const response = await pseService.create(info);
			return res.status(200).json(response);
		} catch(err) {
			return res.status(405).json({message: err.message});
		}
	},

	async deleteSubscribersData(req, res){
		try{
			const response = await pseService.deleteSubscribersData();
			return res.status(200).json(response);
		} catch(err){
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
		const { startDate, endDate, dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5 } = req.body;

		try {
			const response = await pseService.schedulePSE(startDate, endDate, dinamycDate_1, dinamycDate_2, dinamycDate_3, dinamycDate_4, dinamycDate_5);
			return res.status(200).json(response);
		} catch(err) {
			console.log('Controller - Erro ao agendar PSE: ', err);
			return res.status(405).json({message: err.message});
		}
	},

	async updateSchedulePSE(req, res) {

		console.log('Controller updateSchedulePSE');
		
		const pse = {
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			dinamycDate_1: req.body.dinamycDate_1,
			dinamycDate_2: req.body.dinamycDate_2,
			dinamycDate_3: req.body.dinamycDate_3,
			dinamycDate_4: req.body.dinamycDate_4,
			dinamycDate_5: req.body.dinamycDate_5
		};
		
		console.log('Novas informações do pse: ', pse);
		try {
			const { pseDatesFormatted } = await pseService.updateSchedulePSE(pse);
			return res.status(200).json({'message': 'Schedule update', pseDatesFormatted});
		} catch(err) {
			console.log('Controller - Erro ao atualizar PSE: ', err);
			return res.status(405).json({message: err.message});
		}
	},

	async deleteSchedulePSE(req, res) {
		try {
			console.log('Controller deleteSchedulePSE')
			const response = await pseService.deleteSchedulePSE();
			return res.status(200).json(response);
		} catch(err) {
			console.log('Controller - Erro ao deletar PSE: ', err);
			return res.status(405).json({message: err.message});
		}		
	},

	async deleteOnePseDate(req, res) {
		const { name } = req.params;

		try{
			const response = await pseService.deleteOnePseDate(name);
			return res.status(200).json(response);
		} catch(err){
			return res.status(405).json({message: err.message});
		}
	},
	
	async checkSchedulePSE() {
		try {
			await pseService.checkSchedulePSE();
			console.log('🆗 service scheduled!');
		} catch (error) {
			console.log(error.message);
		}
	},

	async getDinamycDatesPSE(req, res) {
		try {
			const response = await pseService.getDinamycDatesPSE();
			return res.status(200).json(response);
		} catch (err) {
			return res.status(405).json({message: err.message});
		}
	}
};

