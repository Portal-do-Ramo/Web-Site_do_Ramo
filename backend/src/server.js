const express = require('express');

const app = express();

const routes = require('./routes/routes');

app.use(express.json());
app.use('/', routes);

app.listen(5000, () => {
    console.log('app is running');
})