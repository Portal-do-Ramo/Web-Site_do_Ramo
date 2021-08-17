const csvHandler = require("../services/csvHandler");

module.exports = {
	async create(req, res){
		try {
			const info = Object.values(req.body);
			csvHandler(info);
			return res.status(200).json({"message": "usuário cadastrado"});
		} catch(err) {
			return res.status(405).json({"message": err.message});
		}
	}
}