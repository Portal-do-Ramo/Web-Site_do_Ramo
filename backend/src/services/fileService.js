const fs = require('fs');
const path = require('path');
const { bucket } = require('../database/firebase');
require('dotenv').config();
const isLocal = process.env.IS_LOCAL

module.exports = {
	async uploadOne(image, name) {
		
		if (isLocal) {
			if (image) {
				const imagePath = path.join(__dirname, '../..', 'uploads');
			
				if (!fs.existsSync(imagePath)) { 
					fs.mkdirSync(imagePath, { recursive: true });
				}

				const imageUpload = path.join(imagePath, `${name}.png`);
				
				fs.writeFileSync(imageUpload, image.buffer)

				return imageUpload
			}
			else {
				throw new Error('Imagem não pode ser enviada!');
			}
		}

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

			if (isLocal) {
				const image = path.join(__dirname, '../..', 'uploads', imgName);
				
				if (fs.existsSync(image)) {
					fs.unlinkSync(image)
					
					return 'Imagem deletada com sucesso!';
				}

				return 'Imagem não existe'

			}

			const image = bucket.file(`uploads/${imgName}`);
			await image.delete();

			return 'Imagem deletada com sucesso!';

		} catch (error) {
			throw new Error('Essa imagem não existe');
		}    
	}
};