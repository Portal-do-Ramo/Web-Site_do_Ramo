const fs = require('fs');
const { bucket } = require('../database/firebase');

module.exports = {
	async uploadOne(image, name) {
		
		if (image) {
			const imageUpload = bucket.file(`uploads/${name}.png`);
			await imageUpload.save(image.buffer, { contentType: image.mimetype });

			const imageURL = `https://storage.googleapis.com/${bucket.name}/${imageUpload.name}`
			
			return imageURL;

		} else {
			throw new Error('Imagem não pode ser enviada!');
		}
	},

	async removeImage(imgName) {
		try {
			await fs.promises.unlink(`./uploads/${imgName.toLowerCase()}`);
			return ('Imagem deletada com sucesso!');
		} catch (error) {
			throw new Error('Essa imagem não existe');
		}    
	}
};