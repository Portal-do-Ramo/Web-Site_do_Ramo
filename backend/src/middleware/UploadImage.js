const multer = require('multer');

module.exports = {
  
	storage() {
		return multer.memoryStorage();
	},

	fileFilter() {
		return ( req, file, cb ) => {
			
			const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
			if (allowedMimeTypes.includes(file.mimetype)) {
				cb(null, true);  // Aceita o arquivo
			} else {
				cb(new Error('Somente arquivos PNG, JPEG e JPG são permitidos'), false);
			}
      
		};
	},

	get getConfig() {
		return {
			storage: this.storage(),
			fileFilter: this.fileFilter()
		};
	}
};