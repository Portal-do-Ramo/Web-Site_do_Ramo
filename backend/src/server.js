const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const routes = require('./routes');
const { checkSchedulePSE } = require('./controllers/pseController');
const swaggerDocs = require('./swagger.json');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = 5000;

app.listen(port, async () => {
	await checkSchedulePSE();
	console.log('🚀 App is running on port:', port);
});