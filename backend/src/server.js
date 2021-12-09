const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));


const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

app.listen(5000);