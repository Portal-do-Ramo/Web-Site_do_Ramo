const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
	'type': 'service_account',
	'project_id': process.env.FIREBASE_PROJECT_ID,
	'private_key_id': process.env.FIREBASE_KEY_ID,
	'private_key': process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	'client_email': process.env.FIREBASE_CLIENT_EMAIL,
	'client_id': process.env.FIREBASE_CLIENT_ID,
	'auth_uri': process.env.AUTH_URI,
	'token_uri': process.env.TOKEN_URI,
	'auth_provider_x509_cert_url': process.env.AUTH_CERT_URL,
	'client_x509_cert_url': process.env.FIREBASE_CLIENT_CERT_URL,
	'universe_domain': 'googleapis.com'
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };