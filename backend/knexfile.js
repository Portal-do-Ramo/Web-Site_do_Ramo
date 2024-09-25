require('dotenv').config();
module.exports = {
	development: {
		client: 'pg',

		connection: {
			host: process.env.DATABASE_HOST || '127.0.0.1',
			database: process.env.DATABASE_NAME,
			user: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			port: process.env.DATABASE_PORT,
			// ssl: {
			// 	rejectUnauthorized: false
			// }
		},
		migrations: {
			tableName: 'migrations',
			directory: `${__dirname}/src/database/migrations`
		},
		seeds: {
			directory: `${__dirname}/src/database/seeds`
		}
	},
};

