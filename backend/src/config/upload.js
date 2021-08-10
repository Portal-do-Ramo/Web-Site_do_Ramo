const multer = require('multer');
const path = require( 'path');

module.exports =  {
	storage: multer.diskStorage({
		destination: path.join(__dirname, '..', '..', 'uploads'),
		filename: (request, file, cb) => {
			const fileName = `${Date.now()}-${file.originalName}}`;

			cb(null, fileName)
		},
	})
};