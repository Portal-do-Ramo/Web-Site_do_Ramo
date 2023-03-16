const pseService = require("../services/pseService");

module.exports =  {
	async create(req, res){
		const info = Object.values({
			nomeCompleto: req.body.nomeCompleto.replace(",", ";"),
			endereco: req.body.endereco.replace(",", ";"),
			celular: req.body.celular.replace(",", ";"),
			email: req.body.email.replace(",", ";"),
			facebook: req.body.facebook.replace(",", ";"),
			linkedIn: req.body.linkedIn.replace(",", ";"),
			instagram: req.body.instagram.replace(",", ";"),
			matricula: req.body.matricula.replace(",", ";"),
			curso: req.body.curso.replace(",", ";"),
			periodo: req.body.periodo.replace(",", ";"),
			equipe: req.body.equipe.replace(",", ";"),
			area: req.body.area.replace(",", ";"),
			porQuaisMotivos: req.body.porQuaisMotivos.replace(",", ";"),
			experiencia: req.body.experiencia.replace(",", ";"),
		});

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

		const info = Object.values({
			nomeCompleto: "usuário de controle [ignorar essa inscrição]",
			dataDeNascimento: "usuário de controle [ignorar essa inscrição]", 
			celular: "usuário de controle [ignorar essa inscrição]", 
			eMail: "usuário de controle [ignorar essa inscrição]", 
			facebook: "usuário de controle [ignorar essa inscrição]", 
			linkedIn: "usuário de controle [ignorar essa inscrição]",
			instagram: "usuário de controle [ignorar essa inscrição]",
			matricula: "usuário de controle [ignorar essa inscrição]",
			curso: "usuário de controle [ignorar essa inscrição]",
			periodo: "usuário de controle [ignorar essa inscrição]",
			equipe: "usuário de controle [ignorar essa inscrição]",
			porQuaisMotivos: "usuário de controle [ignorar essa inscrição]",
			area: "usuário de controle [ignorar essa inscrição]",
			experiencia: "usuário de controle [ignorar essa inscrição]",
			diaDaDinamica: "usuário de controle [ignorar essa inscrição]"
		});

		try {
			const response = await pseService.schedulePSE(startDate, endDate);
			pseService.create(info);
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

