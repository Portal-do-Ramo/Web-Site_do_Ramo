const fs = require('fs');
const fileService = require('../services/fileService');

module.exports = {
	async getByName(req, res) {
		const { name } = req.params;
		try {
			const imageId = await fileService.getByName(name.slice(0,-4));
			// https://drive.google.com/uc?export=view&id=${imageId}
			// https://drive.google.com/file/d/${imageId}/view?usp=sharing
			// https://drive.usercontent.google.com/download?id=${imageId}&export=view
			// https://drive.google.com/thumbnail?id=${imageId}&sz=w1000		| Funcionou
			// https://lh3.google.com/u/0/d/${imageId}		| Funcionou mais ou menos
			if (imageId) {				
				return res.send(`https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`);
			} else {
				return res.sendFile('uploads/ramo_logo.svg', { root: '.' });
			}

		} catch (error) {
			return  res.sendFile('uploads/ramo_logo.svg', { root: '.' });
		}
	},

	async uploadOne(req, res) {
		const image = req.file;
		console.log(image);
		
		const { name: filename } = req.params;
		
		const imageURL = await fileService.uploadOne(image, filename);

		return res.json({imageURL});
	},
    
	async removeImage(req, res) { // verificar onde está sendo usado, pois não existe a rota
		const { imgName } = req.params;
		
		try {
			const result = await fileService.removeImage(imgName);
			return res.json({message: result});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	}
};