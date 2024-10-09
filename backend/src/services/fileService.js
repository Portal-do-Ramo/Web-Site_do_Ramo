const fs = require('fs');
const stream = require('stream');
const driveConfig = require('../config/driveConfig');

async function checkImage(filename) {
	const service = await driveConfig.getAuthDrive();
	const res = await service.files.list({
		q: `name = '${filename}' and mimeType contains 'image/'`,
		fields: 'files(id,name)'
	});
	
	if (res.data.files.length > 0) {
		return res.data.files[0].id
	}
	
	return null;
	
}

module.exports = {

	async getByName(name) {
		const fileId = await checkImage(name);
		return fileId
	},

	async uploadOne(image, filename) {
		if (image) {
			const service = await driveConfig.getAuthDrive();

			const fileMetaData = {
				name: filename,
				parents: [process.env.FOLDER_UPLOADS_ID]
			}

			const bufferStream = new stream.PassThrough();
  			bufferStream.end(image.buffer);

			const media = {
				mimeType: image.mimeType,
				body: bufferStream
			}   

			const imageDriveID = await checkImage(filename)
			
			
			if (imageDriveID) {
				const updateResponse = await service.files.update({
					fileId: imageDriveID,
					media,
					fields: 'id'
				})

				return updateResponse.data.id;
			}

			const response = await service.files.create({
				resource: fileMetaData,
				media,
				fields: 'id'
			})

			return response.data.id
		} else {
			throw new Error('Imagem não pode ser enviada!');
		}
	},

	async removeImage(imgName) {
			const service = await driveConfig.getAuthDrive();
			console.log(imgName.slice(0, -4));
			
			const fileId = await checkImage(imgName.slice(0, -4));
			if(fileId) {
				
				await service.files.delete({
					fileId: fileId
				})
				
				return ('Imagem deletada com sucesso!');
			}
			else {
				return ('Essa imagem não existe');
			}
	}
};