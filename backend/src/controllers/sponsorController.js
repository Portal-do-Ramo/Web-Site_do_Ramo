const sponsorService = require("../services/sponsorService");

module.exports = {
	async index(req, res) {
		let sponsors = await sponsorService.index();
		return res.status(200).json(sponsors);
	},

	async create(req, res) {
		let { name, imageURL, link } = req.body;

		try {
			const response = await sponsorService.create(name, imageURL, link);
			return res.status(201).json(response);
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}
	},

	async update(req, res) {
		let { sponsor } = req.body;
		let { id } = req.params;

		try {
			const response = await sponsorService.update(id, sponsor);
			return res.status(200).json(response);
		} catch (err) {
			return res.status(405).json({ message: err.message });
		}
	},

	async delete(req, res) {
		let { id } = req.params;

		try {
			let response = await sponsorService.delete(id);
			return res.status(200).json(response);
		} catch (err) {
			return res.status(405).json({ message: err.message });
		}
	}
}