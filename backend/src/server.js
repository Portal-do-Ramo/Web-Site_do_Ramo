const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());

const routes = require("./routes");

app.use(express.json());
app.use("/api", routes);

app.listen(5000);