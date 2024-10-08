const { google } = require('googleapis');
require('dotenv').config();

const driveCredentials = {
	'type': 'service_account',
	'project_id': process.env.DRIVE_PROJECT_ID,
	'private_key_id': process.env.DRIVE_PRIVATE_KEY_ID,
	'private_key': process.env.DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, ''),
	'client_email': process.env.DRIVE_CLIENT_EMAIL,
	'client_id': process.env.DRIVE_CLIENT_ID,
	'auth_uri': process.env.AUTH_URI,
	'token_uri': process.env.TOKEN_URI,
	'auth_provider_x509_cert_url': process.env.AUTH_CERT_URL,
	'client_x509_cert_url': process.env.DRIVE_CLIENT_CERT_URL,
	'universe_domain': 'googleapis.com'
};

module.exports = {
	async getAuthDrive(image, filename){
        
		const auth = new google.auth.GoogleAuth({
			credentials: driveCredentials,
			scopes: 'https://www.googleapis.com/auth/drive'
		});

        const service = google.drive({version: 'v3', auth});

		return service;
	}
};